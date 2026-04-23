# ArchBoard Pro — Agent Development Guide

> 本文档面向后续维护与扩展该项目的开发者与 AI 代理。阅读本文件是修改代码前的必要步骤。

---

## 1. 项目定位

**ArchBoard Pro** 是一个面向建筑设计师的**情绪板（Mood Board）与展板排版参考系统**。核心价值：将建筑风格、展板布局、图纸风格、配色方案、材质搭配、视觉艺术效果六大维度进行模块化组合，生成可即时预览的配置方案，并输出 AI 绘画提示词。

**目标用户**：建筑学学生、执业建筑师、室内设计师。

**部署形态**：纯前端单页应用（SPA），零后端依赖，可直接通过 `file://` 或静态托管（GitHub Pages / Vercel）运行。

---

## 2. 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 标记 | HTML5 | 语义化结构 |
| 样式 | Tailwind CSS (CDN) | 布局骨架 + 工具类 |
| 样式 | 原生 CSS | 设计系统变量、视觉资产、艺术效果覆盖 |
| 逻辑 | 原生 JavaScript (ES6+) | 无框架，命令式 DOM 操作 |
| 持久化 | localStorage | 状态自动保存，key = `archBoardProState` |
| 数据 | 静态 JS 模块 | `data/*.js` 通过 `<script src>` 加载 |

**刻意保持零构建工具**。项目不依赖 Node.js、Webpack、Vite 等。新增开发者无需配置环境，打开 `index.html` 即可运行。

---

## 3. 文件结构

```
arch-mood-board-reference/
├── index.html                  # 唯一主文件 (~3000行, HTML+CSS+JS)
│   ├── <style>                 # 设计系统 + 组件样式 + 艺术效果 (~1800行)
│   ├── <body>                  # 三栏骨架 (~200行)
│   └── <script>                # 状态 + 渲染 + 交互 (~1100行)
├── data/
│   ├── arch-styles.js          # 20 种建筑风格数据
│   ├── board-layouts.js        # 12 种展板布局数据
│   ├── drawing-styles.js       # 10 种图纸风格数据
│   ├── color-schemes.js        # 12 种配色方案数据
│   ├── material-palettes.js    # 8 种材质搭配数据
│   └── art-effects.js          # 10 种艺术效果数据
├── AGENTS.md                   # 本文件
└── index.html.broken           # 历史备份（勿删）
```

### 数据文件约定

每个 `data/*.js` 文件导出一个同名数组变量：

```js
const archStyles = [
  {
    id: 1,                    // 正整数，全局唯一
    name: "粗野主义 Brutalism", // 中文名 + 英文名
    category: "结构表现",      // 分类标签
    description: "...",        // 一句话描述
    prompt: "..."              // AI 绘画提示词片段
    // 可选扩展字段：visualAsset, tags, year, architects...
  }
];
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { archStyles };
}
```

**新增数据条目的规则**：
1. 在对应 `data/*.js` 中追加对象
2. 确保 `id` 不与现有条目冲突
3. 在 `index.html` 的 `<style>` 中新增对应的视觉资产 CSS（当前为硬编码，未来会迁移为数据驱动）
4. 确认 `index.html` 的渲染逻辑无需修改即可兼容新数据

---

## 4. 核心架构

### 4.1 状态管理

全局状态变量（全部挂在 `window` 作用域，这是当前技术债）：

```js
currentStyle        // 当前选中的建筑风格
currentLayout       // 当前选中的展板布局
currentDrawing      // 当前选中的图纸风格
currentColorScheme  // 当前选中的配色方案
currentMaterial     // 当前选中的材质搭配
currentArtEffect    // 当前选中的艺术效果
activeTab           // 当前激活的标签页 (1-8)
favorites           // 收藏数组 [{styleId, layoutId, ...}]
slotImages          // 插槽图片 {slotId: {data: base64, mode: 'cover'|'contain'}}
```

**持久化**：
- `saveState()` — 将上述变量序列化为 JSON，写入 `localStorage['archBoardProState']`
- `loadState()` — 页面加载时从 localStorage 恢复，若不存在则使用默认值
- 任何用户操作（选择卡片、切换标签、上传图片）都会触发 `saveState()`

### 4.2 渲染管线

```
用户选择卡片
    ↓
更新全局状态变量
    ↓
saveState() → localStorage
    ↓
renderActiveTab() → 重新渲染当前标签的网格
    ↓
renderPreview() → 重新渲染预览画板
    ↓
applyArtEffect() → 给 .preview-board 添加 art-effect-N class
```

**关键渲染函数**：

| 函数 | 职责 |
|------|------|
| `renderStyles()` / `renderLayouts()` / ... | 各标签页的卡片网格渲染 |
| `renderPreview()` | 根据 `currentPreviewMode` 分发到四种预览模式 |
| `renderPreviewA0()` | A0 横版展板（~1000px 宽，1.414:1）|
| `renderPreviewA3()` | A3 竖版展板（~420px 宽，1:1.414）|
| `renderPreviewSquare()` | 方形社交媒体卡片（420×420）|
| `renderPreviewMood()` | 情绪板拼贴（600×400）|
| `slot(id, extraStyle, label)` | 生成可上传/拖拽的插槽 HTML |

### 4.3 插槽系统

预览画板由多个 `slot()` 组成。每个 slot：
- 支持 **点击上传** 图片（触发隐藏的 `<input type="file">`）
- 支持 **拖拽上传**（`dragover`/`dragleave`/`drop`）
- 存储格式：`slotImages[slotId] = { data: base64String, mode: 'cover'|'contain' }`
- 显示模式切换：点击 slot 右下角的 MODE 标签切换 cover/contain

---

## 5. 艺术效果系统（关键知识）

### 5.1 设计原则

艺术效果**仅作用于预览画板**（`.preview-board`），不影响全局页面。这是刻意的设计决策——艺术效果是"预览滤镜"，不应改变整个应用的可用性。

### 5.2 实现机制

每个艺术效果由两部分组成：

1. **`.preview-overlay` 纹理层**：
   ```css
   .preview-board.art-effect-N .preview-overlay {
       opacity: 1;
       background: ... ; /* 纹理图案 */
   }
   ```
   `.preview-overlay` 是 `.preview-board` 内部的绝对定位覆盖层（`position:absolute; inset:0; z-index:5; pointer-events:none`）。默认 `opacity: 0`，应用效果时变为 `opacity: 1`。

2. **子元素样式覆盖**：
   ```css
   .preview-board.art-effect-N .preview-slot,
   .preview-board.art-effect-N .card-base {
       border: ... !important;
       border-radius: ... !important;
       box-shadow: ... !important;
   }
   ```
   覆盖 slot 和 card 的边框、圆角、阴影、背景、字体等。

3. **字体变量覆盖**：
   ```css
   .preview-board.art-effect-N {
       --font-heading: 'Bebas Neue', ... !important;
       --font-body: 'Bebas Neue', ... !important;
   }
   ```

### 5.3 新增艺术效果的步骤

1. 在 `data/art-effects.js` 中追加数据对象
2. 在 `index.html` 的 `<style>` 中新增：
   ```css
   .preview-board.art-effect-N .preview-overlay {
       opacity: 1;
       /* 你的纹理 */
   }
   .preview-board.art-effect-N {
       --font-heading: ... !important;
       --font-body: ... !important;
   }
   .preview-board.art-effect-N .preview-slot,
   .preview-board.art-effect-N .card-base {
       /* 你的子元素覆盖 */
   }
   ```
3. **不要**使用 `#art-effect-overlay` 或 `.overlay-layer.texture` —— 这些选择器对应的 DOM 已被移除，是死代码。

---

## 6. 已知技术债

| 债务 | 影响 | 计划修复 |
|------|------|----------|
| 单文件 3000+ 行 | 维护困难，diff 不可读 | Phase 1: 拆分为 ES Modules |
| 全局作用域污染 | 命名冲突风险，无法测试 | Phase 1: IIFE / ES Modules |
| 视觉资产 CSS 硬编码 | 新增风格需改 HTML | Phase 3: SVG 程序化生成 |
| 内联事件处理器 | `onclick="selectStyle(1)"` 依赖全局函数 | Phase 1: 事件委托模式 |
| innerHTML 全量重建 | 筛选时 DOM 重建开销 | Phase 2: 虚拟 DOM 或 diff 更新 |
| 无单元测试 | 回归风险 | Phase 1: 模块化后引入 Vitest |
| 收藏无 UI | 数据在 localStorage，用户不可见 | Phase 2: 收藏面板 |
| URL 不可分享 | 无法通过链接传播 | Phase 2: URL hash 序列化 |

---

## 7. 编码规范

### 7.1 命名

- CSS 类名：`kebab-case`，BEM 风格（如 `.preview-slot`, `.card-base`）
- JS 变量/函数：`camelCase`
- 数据字段：`camelCase`
- ID：仅在必要时使用，优先用 class

### 7.2 CSS 优先级

- 设计系统变量：`--font-heading`, `--primary`, `--background` 等
- 组件样式：直接写在 `<style>` 中
- 艺术效果覆盖：**必须**使用 `!important`（因为需要覆盖 Tailwind 和组件样式）
- **禁止**使用 `#art-effect-overlay` 选择器

### 7.3 JS 模式

- 使用 `const` / `let`，不使用 `var`
- 模板字符串优先于字符串拼接
- 数组方法优先于 `for` 循环（`map`, `filter`, `find`）
- DOM 操作批量进行，减少重排

### 7.4 数据兼容性

- 新增字段必须为**可选**，确保旧状态恢复时不报错
- 修改数据结构时，在 `loadState()` 中提供迁移逻辑

---

## 8. 扩展方向备忘

以下功能已纳入产品规划，如需实现请参考对应设计：

- **收藏系统 UI**：右栏底部折叠面板，展示收藏列表 + 对比 + 删除
- **URL 状态分享**：`#s1-l2-d3-c4-m5-e6` 短编码格式
- **撤销/重做**：维护 `history[]` 栈（最大 20 步），Ctrl+Z / Ctrl+Y
- **PNG 导出**：`html2canvas` 或 `dom-to-image` 将 `.preview-board` 导出
- **插件系统**：`window.ArchBoard.registerStyle()` API
- **暗色模式**：`dark-mode-active` class 已存在，需添加系统级切换

---

## 9. 调试技巧

- **清空状态**：浏览器控制台执行 `localStorage.removeItem('archBoardProState'); location.reload()`
- **查看当前状态**：`console.log(JSON.parse(localStorage['archBoardProState']))`
- **快速测试艺术效果**：在控制台执行 `applyArtEffect(artEffects[0])`
- **检查 DOM 结构**：确保 `.preview-board` 内部有 `.preview-overlay` 子元素

---

*文档版本: 2026-04-23 | 维护者: 后续所有 Agent 与开发者*
