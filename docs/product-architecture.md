# ArchBoard Pro — 产品架构分析与演进规划

> **视角**：产品经理 + 技术架构师  
> **目的**：理解当前系统，识别风险，规划扩展路径，为后续迭代提供决策依据。

---

## 一、项目现状诊断

### 1.1 核心产品定位

ArchBoard Pro 是一个面向**建筑设计师的情绪板（Mood Board）与展板排版参考系统**。

**核心价值主张**：
- 将建筑风格、展板布局、图纸风格、配色方案、材质搭配、视觉艺术效果六大维度模块化
- 任意组合生成即时可视化的配置方案
- 一键输出 AI 绘画提示词（Midjourney / Stable Diffusion 兼容）

**目标用户画像**：
| 角色 | 痛点 | 使用场景 |
|------|------|----------|
| 建筑学学生 | 不知道展板如何排版、配色如何搭配 | 课程设计前快速生成参考方案 |
| 执业建筑师 | 需要向客户展示多种风格方向 | 方案阶段的情绪板制作 |
| 室内设计师 | 材质搭配缺乏系统参考 | 材料板（Material Board）生成 |

### 1.2 当前架构概览

```
arch-mood-board-reference/
├── index.html              (~3000 行，单文件应用：HTML + CSS + JS)
├── data/
│   ├── arch-styles.js      (20 种建筑风格)
│   ├── board-layouts.js    (12 种展板布局)
│   ├── drawing-styles.js   (10 种图纸风格)
│   ├── color-schemes.js    (12 种配色方案)
│   ├── material-palettes.js (8 种材质搭配)
│   └── art-effects.js      (10 种艺术效果)
└── AGENTS.md               (开发规范)
```

**技术栈**: 纯原生 HTML/CSS/JS，Tailwind CSS CDN，零构建工具，零框架。

**部署形态**: 纯静态文件，可直接 `file://` 打开，也可托管到 GitHub Pages / Vercel / Netlify。

### 1.3 数据流与状态管理

```
用户交互 → 全局变量更新 → localStorage 持久化 → innerHTML 重新渲染
```

全局状态变量：`currentStyle`, `currentLayout`, `currentDrawing`, `currentColorScheme`, `currentMaterial`, `currentArtEffect`, `activeTab`, `favorites[]`, `slotImages{}`

**持久化策略**: 任何状态变更立即序列化到 `localStorage['archBoardProState']`，页面加载时自动恢复。

### 1.4 功能完成度

| 模块 | 完成度 | 说明 |
|------|--------|------|
| 三栏骨架与网格系统 | 100% | Desktop/Tablet/Mobile 响应式 |
| 视觉资产 CSS | 100% | 72 张卡片的 CSS 抽象图形（零图片资源）|
| 状态管理与持久化 | 90% | localStorage 读写，状态恢复 |
| 实时预览系统 | 85% | A0/A3/方形/情绪板四种模式 |
| AI 提示词生成器 | 90% | 组合提示词 + 分类提示词 |
| 插槽图片系统 | 80% | 点击上传 + 拖拽上传 + 模式切换（cover/contain）|
| 艺术效果应用 | 80% | 10 种效果，局部作用于预览区 |
| 收藏/随机/导出 | 80% | JSON 导出，F 收藏，R 随机 |
| 键盘快捷键 | 100% | 1-8 切换标签，R/F 快捷键 |

---

## 二、架构痛点与风险分析

### 2.1 单文件瓶颈（🔴 高风险）

`index.html` 已达 **~3000 行**。代码结构：
- CSS: ~1800 行（视觉资产 + 组件样式 + 艺术效果覆盖）
- HTML: ~200 行（三栏骨架 + 8 个 tab 容器）
- JS: ~1100 行（状态 + 渲染 + 交互 + 预览 + 插槽）

**风险**: 
- 任何修改都需要编辑同一个文件，极易引入回归 bug
- 代码审查时 diff 不可读
- 多人协作几乎不可能
- 首屏加载需解析完整 150KB HTML

### 2.2 全局作用域污染（🟠 中高风险）

所有状态变量和函数都挂在 `window` 对象上。内联事件处理器如 `onclick="selectStyle(1)"` 依赖全局函数存在。

**风险**:
- 未来引入第三方库时命名冲突
- 无法做 tree-shaking 或代码分割
- 单元测试困难（无法 mock 模块依赖）

### 2.3 渲染性能隐患（🟡 中风险）

每次筛选操作都重新生成整个 grid 的 `innerHTML`：
```js
grid.innerHTML = items.map(...).join('');
```

当前 20-30 条数据尚可接受，但无上限保护机制。当数据量增长到 50+ 时，频繁筛选会导致明显卡顿。

### 2.4 数据与表现耦合（🟡 中风险）

6 个数据文件是静态 JS 数组，但**视觉资产 CSS 硬编码在 `index.html` 中**。新增一种风格需要：
1. 编辑 `data/arch-styles.js`
2. 在 `index.html` CSS 中新增 `.style-art-xxx` 抽象画（~30 行）
3. 在 `index.html` JS 中确认渲染逻辑兼容

三步缺一不可，且分散在不同位置。

### 2.5 缺失的产品能力

| 缺失项 | 用户影响 | 优先级 |
|--------|----------|--------|
| 收藏 UI | 收藏数据存在 localStorage，但无界面查看/管理 | P0 |
| URL 状态同步 | 无法通过链接分享当前配置，阻断社交传播 | P0 |
| 撤销/重做 | 用户误操作无法回退 | P1 |
| 批量导出图片 | 只能导出 JSON，无法导出预览图为 PNG | P1 |
| 移动端体验 | 底部 Tab 栏过于简陋，触摸区域过小 | P1 |
| 暗色模式 | 蓝图配色存在但无系统级暗色切换 | P2 |

---

## 三、可行性建议（按优先级排序）

### 建议 1: 渐进式模块化重构（P0 — 2-3 周）

**目标**: 将单文件拆分为可维护的模块结构，**不引入构建工具**（保持零依赖的核心优势）。

**方案**: 使用浏览器原生 ES Modules（`<script type="module">`），现代浏览器支持率 > 97%。

```
src/
  ├── main.js           (入口：初始化 + 事件绑定)
  ├── state.js          (全局状态定义 + localStorage 封装)
  ├── renderers/
  │   ├── styles.js
  │   ├── layouts.js
  │   ├── drawings.js
  │   ├── colors.js
  │   ├── materials.js
  │   ├── effects.js
  │   ├── preview.js    (A0/A3/Square/Mood 四种模式)
  │   └── prompts.js
  ├── components/
  │   ├── card.js       (卡片工厂函数)
  │   ├── modal.js
  │   ├── toast.js
  │   └── slot.js
  ├── utils/
  │   ├── dom.js
  │   └── helpers.js
  └── css/
      ├── tokens.css    (Design System Variables)
      ├── components.css
      ├── art-effects.css
      └── preview.css
```

**收益**:
- 单文件行数从 3000 → 各模块 100-300 行
- 可引入 Vitest 进行单元测试
- 代码审查 diff 可读，支持多人协作
- 不增加任何构建步骤，保持"打开即用"体验

**可行性**: ⭐⭐⭐⭐⭐ 极高

---

### 建议 2: 收藏系统 UI 与历史记录（P0 — 1 周）

**目标**: 让收藏功能从"黑盒 localStorage"变成可感知、可管理的产品功能。

**方案**:
1. **收藏面板**: 在右栏底部新增"我的收藏"折叠面板，显示已收藏的组合列表（缩略图 + 名称 + 时间戳）
2. **收藏对比**: 支持左右并排对比两个收藏组合
3. **历史记录栈**: 维护 `history[]` 数组（最大 20 步），支持 Ctrl+Z / Ctrl+Y 撤销重做
4. **收藏导入/导出**: 支持 `.archboard` 专有格式导出（本质为 JSON，品牌感）

**UI 草图**:
```
右栏
├── 当前配置
├── 快速切换
└── [▼] 我的收藏 (3)
     ├─ ○ 收藏 1 · 粗野主义+网格秩序 · 2小时前
     ├─ ○ 收藏 2 · 参数化+暗黑沉浸 · 昨天
     └─ [对比选中] [删除]
```

**可行性**: ⭐⭐⭐⭐⭐ 极高。纯前端功能，数据已在 localStorage 中。

---

### 建议 3: URL 状态序列化（P1 — 3 天）

**目标**: 让用户可以通过链接分享当前配置。

**方案**: 将当前状态编码为简洁的 URL hash：
```
https://archboard.pro/#s1-l2-d3-c4-m5-e6
```

**实现**:
- `saveState()` 时同步更新 `location.hash`
- 页面加载时解析 `location.hash` 覆盖 localStorage 状态

**商业价值**: 社交传播的核心基础设施。用户分享链接 → 新用户访问 → 自然增长。

**可行性**: ⭐⭐⭐⭐⭐ 极高。纯前端，无后端依赖。

---

### 建议 4: 数据驱动渲染（P1 — 2 周）

**目标**: 新增一种风格只需编辑数据文件，无需修改 CSS/JS。

**方案**: 将视觉资产从 CSS 硬编码改为 **SVG Data URI + 程序化生成**。

```js
// 数据文件中新增 visualAsset 字段
const archStyles = [
  {
    id: 1,
    name: "粗野主义 Brutalism",
    visualAsset: {
      type: 'svg',
      src: `data:image/svg+xml,${encodeURIComponent('<svg>...</svg>')}`,
      bgColor: '#7a7a7a'
    }
  }
];
```

渲染时统一使用数据驱动：
```js
function renderStyleCard(style) {
  return `<div class="card-base">
    <div class="style-art" style="background:${style.visualAsset.bgColor}; background-image:url('${style.visualAsset.src}')">
    </div>
    ...
  </div>`;
}
```

**可行性**: ⭐⭐⭐⭐ 高。需要一次性迁移 72 个视觉资产，但后续扩展零成本。

---

### 建议 5: 预览图导出为 PNG（P1 — 1 周）

**目标**: 一键将当前预览画板导出为高清 PNG。

**方案**: 引入 `html2canvas` 或 `dom-to-image` 库（~30KB），将 `.preview-board` DOM 节点渲染为 Canvas 再导出 PNG。

**可行性**: ⭐⭐⭐⭐ 高。轻量库，显著提升产品价值。

---

### 建议 6: 插件系统架构（P2 — 3 周）

**目标**: 让第三方开发者或高级用户可以添加自定义风格、布局、效果。

**方案**: 暴露全局 API：
```js
window.ArchBoard = {
  registerStyle(styleData) { /* ... */ },
  registerLayout(layoutData) { /* ... */ },
  registerEffect(effectData, cssGenerator) { /* ... */ },
  on(event, callback) { /* ... */ }
};
```

用户上传 `.archplugin.js` 文件即可扩展功能。

**可行性**: ⭐⭐⭐ 中。需先完成建议 1（模块化）作为基础。

---

## 四、技术架构演进路线

### Phase 1: 解耦（第 1-3 周）
- [ ] 单文件拆分为 ES Modules
- [ ] CSS 拆分为 4-5 个文件
- [ ] 建立 `AGENTS.md` 开发规范（✅ 已完成）
- [ ] 引入 Vitest 单元测试框架

### Phase 2: 体验增强（第 4-5 周）
- [ ] 收藏系统 UI
- [ ] URL 状态序列化
- [ ] 撤销/重做
- [ ] 预览图 PNG 导出

### Phase 3: 数据驱动（第 6-7 周）
- [ ] 视觉资产从 CSS 迁移为 SVG 程序化生成
- [ ] 数据文件支持 JSON Schema 验证
- [ ] 支持用户自定义数据导入

### Phase 4: 扩展性（第 8-10 周）
- [ ] 插件系统 API
- [ ] 社区插件市场（静态页面展示）
- [ ] 团队协作（基于 GitHub Gist 的共享存储）

---

## 五、商业模式建议

### 5.1 免费层（Free）
- 所有基础风格、布局、配色、材质（当前全部功能）
- 单用户本地使用
- PNG 导出（带 ArchBoard 水印）

### 5.2 Pro 层（$8/月 或 $60/年）
- 去除水印
- 云同步收藏（跨设备，基于 GitHub Gist / Firestore）
- 高级艺术效果（参数化调节强度、叠加多层效果）
- 批量导出（一次导出所有四种预览模式）
- 团队协作（共享工作区，3 人以内）

### 5.3 企业层（定制报价）
- API 接入（将 ArchBoard 嵌入企业内部设计系统）
- 自定义品牌（替换 Logo、配色、域名）
- 私有部署（企业内网）
- SLA 支持

---

## 六、关键决策备忘

| 决策 | 当前状态 | 推荐方案 | 理由 |
|------|----------|----------|------|
| 单文件 vs 模块化 | 单文件 3000 行 | **渐进式模块化** | 维护性、可测试性、协作性 |
| 无框架 vs 框架 | 纯原生 JS | **保持原生** + ES Modules | 零构建、零依赖、加载快、学习成本低 |
| 数据格式 | 静态 JS 数组 | **JSON + Schema** | 便于验证、导入、API 对接 |
| 状态持久化 | localStorage | **localStorage + URL hash** | 支持分享链接 |
| 视觉资产 | CSS 硬编码 | **SVG 程序化生成** | 新增资产零代码成本 |
| 部署方式 | 静态文件 | **GitHub Pages / Vercel** | 免费 CDN、自动部署、全球加速 |
| 艺术效果作用域 | 预览区局部 | **保持局部** | 全局效果会干扰应用可用性 |

---

## 七、竞品参照

| 产品 | 定位 | ArchBoard 差异化 |
|------|------|------------------|
| **Pinterest** | 通用图片收藏 | 垂直建筑领域，结构化数据（风格/布局/配色），AI 提示词输出 |
| **Morpholio Board** | 专业情绪板工具 | 免费、零安装、中文原生、建筑学专业术语 |
| **Canva** | 通用设计工具 | 专注建筑展板场景，参数化布局而非自由拖拽 |
| **Midjourney** | AI 绘画 | ArchBoard 是"提示词生成器的前置工具"，互补关系 |

---

*文档版本: 2026-04-23  
下次 review 时机: Phase 1 完成后（预计 3 周后）*
