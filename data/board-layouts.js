const boardLayouts = [
  {
    id: 1,
    name: "竞赛正图·网格秩序",
    description: "严格的行列网格，理性清晰，适合毕业设计与竞赛正图。主效果图占1/3面积，其余为平立剖与技术说明",
    vibe: "理性、秩序、专业",
    keywords: "网格, 行列, 对齐, 理性, 竞赛正图, 毕业设计, 建筑图纸, 技术图纸",
    prompt: "Strict grid-based architectural presentation board layout. Main rendered perspective occupies top-left 1/3 area. Remaining space divided into equal grid cells for floor plans, elevations, sections, and technical annotations. Aligned rows and columns, rational information hierarchy, clear visual order, professional competition panel style. Equal margins, systematic arrangement, calm and authoritative atmosphere",
    bestFor: "毕业设计正图, 竞赛展板, 技术图纸为主的项目",
    structure: "3-4行 × 3-4列网格，主图占2×2网格",
    spacing: "等距留白，严格对齐，统一网格间距",
    composition: "左上角或中央偏左放置主效果图，右下角技术说明，其余图纸均匀填充"
  },
  {
    id: 2,
    name: "竞赛正图·主次分明",
    description: "中心放大一张重点效果图或分析图，其余小图围绕排列，强调视觉焦点。常见于国际竞赛获奖作品",
    vibe: "聚焦、张力、层次",
    keywords: "主次分明, 视觉焦点, 中心放大, 环绕排列, 竞赛获奖, 重点图, 层次",
    prompt: "Hierarchy-driven architectural presentation board. One dominant hero image (rendering or analysis diagram) occupies center 40-50% of board area at large scale. Supporting smaller drawings (plans, diagrams, details) arranged around the periphery in clusters. Strong visual hierarchy, focal point emphasis, competition-winning style. Clean negative space around the hero image, smaller elements form supporting ring",
    bestFor: "国际竞赛展板, 概念方案汇报, 效果展示",
    structure: "中央大图(40-50%) + 四周小图环绕",
    spacing: "大图周围保持呼吸留白，小图紧凑排列",
    composition: "主效果图居中偏上，分析图/平面图在下部带状排列，文字说明沿边"
  },
  {
    id: 3,
    name: "竞赛正图·竖版分栏",
    description: "A1/A0竖向展板的标准做法，2-3栏纵向分割，适合廊道式展陈阅读",
    vibe: "纵向流动、阅读感、经典",
    keywords: "竖版, 分栏, 纵向, A1竖向, 廊道展板, 经典排版, 阅读路径",
    prompt: "Vertical A1/A0 portrait architectural presentation board. Divided into 2-3 vertical columns from top to bottom. Left column: concept sketches and process diagrams. Middle column: main rendered perspective and key floor plans. Right column: sections, elevations, and technical details. Sequential vertical reading flow, classic competition panel style, corridor display optimized. Consistent column widths with subtle separators",
    bestFor: "A1/A0竖向展板, 廊道展示, 毕业答辩, 纵向阅读",
    structure: "2-3栏纵向分割，每栏独立内容区",
    spacing: "栏间留白20-40mm，栏内紧凑",
    composition: "左栏概念，中栏主图+平面，右栏剖面+细节"
  },
  {
    id: 4,
    name: "竞赛正图·横版叙事",
    description: "A0横向展板，从左到右讲述设计过程：场地→概念→生成→结果，适合评审团快速理解",
    vibe: "叙事、流动、逻辑清晰",
    keywords: "横版, 叙事, 时间轴, 过程, A0横向, 讲故事, 逻辑, 评审",
    prompt: "Horizontal A0 landscape architectural presentation board. Left-to-right narrative flow: site analysis (far left), concept generation (left-center), design evolution (center), final renderings and plans (right). Story-telling layout for jury review. Sequential progression with subtle arrows or numbering. Consistent vertical baselines across columns. Clean transitions between stages",
    bestFor: "A0横向展板, 设计过程展示, 评审汇报, 讲故事型方案",
    structure: "4-5个横向内容区，从左到右推进",
    spacing: "区域间用留白或细线分隔，保持水平基线对齐",
    composition: "场地分析→概念草图→生成逻辑→效果图→平面剖面"
  },
  {
    id: 5,
    name: "竞赛正图·便当盒模块",
    description: "模块化卡片系统，大小卡片灵活组合，信息密度高，适合复杂项目",
    vibe: "现代、模块、信息丰富",
    keywords: "便当盒, 模块化, 卡片, 信息密度, 灵活组合, 复杂项目, 现代",
    prompt: "Bento box modular architectural presentation board. Mix of large feature cards (main renderings, key plans) and smaller info cards (details, diagrams, text blocks). Varying sizes create rhythm: one large 2x2 card + several 1x1 and 1x2 cards. Uniform card spacing with rounded or sharp corners. Apple-style clean presentation. High information density while maintaining visual order. Grid-aligned but with size variation",
    bestFor: "信息密集型展板, 综合项目, 数据可视化, 作品集",
    structure: "大小不等的矩形模块，网格对齐",
    spacing: "统一模块间距8-16mm，内部紧凑",
    composition: "大模块放主效果图和总平面，小模块放分析图和文字"
  },
  {
    id: 6,
    name: "竞赛正图·暗黑沉浸",
    description: "深色背景+亮色图纸，效果图如发光体般突出。常见于Zaha、MAD等前卫事务所竞赛作品",
    vibe: "沉浸、冲击、前卫",
    keywords: "暗黑, 深色背景, 沉浸, 冲击, 前卫, 发光效果, 夜览模式, 竞赛",
    prompt: "Dark-mode architectural presentation board with deep charcoal or black background. Drawings and renderings appear to glow against the dark canvas. Main rendering centrally placed with dramatic lighting. Technical drawings in white or light gray linework. Subtle color accents (neon or warm) for emphasis. Cinematic atmosphere, MAD/Zaha Hadid competition style. Strong contrast, immersive experience, night-view aesthetic",
    bestFor: "前卫方案, 夜景效果图, 参数化设计, 国际竞赛",
    structure: "深色背景，中央发光效果图，四周线稿",
    spacing: "暗色区域自然形成留白，图纸间用暗色间隙分隔",
    composition: "深色底图，中央主效果图如发光体，四周白色线稿图纸，点缀荧光色标注"
  },
  {
    id: 7,
    name: "竞赛正图·全出血大图",
    description: "效果图充满整个版面或占80%以上，文字叠印在图上，具有极强的视觉冲击力",
    vibe: "沉浸、电影感、震撼",
    keywords: "全出血, 满版, 大图, 电影感, 叠加文字, 震撼, 沉浸, 效果图",
    prompt: "Full-bleed architectural presentation board. One massive rendering or photograph extends to or near the board edges, occupying 70-80% of area. Minimal text overlaid on image with semi-transparent backing strips or contrasting color blocks. Text is brief: project name, location, scale. Magazine cover aesthetic, cinematic impact, architectural photography showcase. Dramatic perspective, atmospheric lighting in rendering",
    bestFor: "效果图展示, 宣传册封面, 竞赛封面, 视觉冲击力优先",
    structure: "满版或近满版效果图 + 叠印文字",
    spacing: "无传统留白，图片直达边缘，文字区域用半透明遮罩",
    composition: "效果图占80%以上版面，标题和少量说明叠印在暗色区域"
  },
  {
    id: 8,
    name: "竞赛正图·小清新留白",
    description: "大面积暖白/浅灰底色，极少图纸，呼吸感强。常见于北欧、日本事务所方案",
    vibe: "克制、宁静、呼吸感",
    keywords: "小清新, 留白, 极简, 呼吸感, 北欧, 日本, 克制, 少即是多",
    prompt: "Minimalist architectural presentation board with vast warm white or light gray background. Only 2-4 carefully selected drawings with generous margins (60-100mm). One focal perspective or model photo, one plan, minimal text. Gallery-like presentation with breathing room. Japanese or Scandinavian office aesthetic. Every element carefully curated. Calm, sophisticated, restrained. Soft natural tones, no heavy blacks",
    bestFor: "概念展板, 高端方案, 画廊展示, 北欧/日本风格项目",
    structure: "极少元素，大面积空白，2-4张精选图纸",
    spacing: "极大边距60-100mm，元素间大量留白",
    composition: "中央偏上放一张效果图，左下放一张平面图，右侧少量文字"
  },
  {
    id: 9,
    name: "竞赛正图·轴测分解",
    description: "中央放置轴测爆炸图，用引线连接四周的构造节点与细节，适合构造课程设计",
    vibe: "技术、清晰、构造",
    keywords: "轴测, 爆炸图, 构造, 分解, 引线, 节点, 技术, 构造课程",
    prompt: "Axonometric exploded-view architectural presentation board. Central large-scale 3D axonometric or exploded axonometric drawing showing all building layers. Callout lines radiate to surrounding detail panels: structural joints, material connections, section details. Construction-focused presentation, technical clarity. Numbered bubbles linking central drawing to perimeter details. Clean linework, consistent line weights, precise annotations",
    bestFor: "构造详图, 节点设计, 结构展示, 技术课程",
    structure: "中央轴测爆炸图 + 四周细节标注面板",
    spacing: "引线区域保持清晰，细节面板大小一致呈环状排列",
    composition: "中央大型轴测图，四周均匀分布8-12个构造节点详图"
  },
  {
    id: 10,
    name: "竞赛正图·分析图解",
    description: "以分析图、气泡图、流线图为绝对主导，适合研究型项目和前期概念展板",
    vibe: "分析、研究、信息可视化",
    keywords: "分析图, 气泡图, 流线, 图解, 研究, 数据可视化, 前期概念",
    prompt: "Diagram-dominated architectural presentation board. Bubble diagrams, circulation studies, sun path analysis, wind flow simulations, programmatic diagrams occupy 60-70% of board. Few traditional plans/sections. Information visualization style with arrows, icons, color-coded layers. Research project aesthetic. Clean vector graphics, consistent icon system, layered information. Analytical rather than representational",
    bestFor: "研究性项目, 分析图展板, 前期概念, 数据可视化",
    structure: "分析图阵列 + 少量平面/效果图",
    spacing: "图解元素紧密排列但层次分明，用颜色区分层级",
    composition: "上部概念图解，中部流线/日照分析，下部平面图和效果图"
  },
  {
    id: 11,
    name: "竞赛正图·杂志编辑风",
    description: "多栏文字与图片混排，编辑感强，适合详细方案说明和期刊投稿",
    vibe: "编辑、优雅、阅读体验",
    keywords: "杂志, 编辑, 多栏文字, 图文混排, 期刊, 优雅, 阅读, 说明",
    prompt: "Editorial magazine-style architectural presentation board. Multi-column text blocks (2-3 columns) flowing around embedded images. Caption hierarchy with figure numbers. Pull quotes in larger type. Body text at readable size (9-11pt). Images placed as inline figures with text wrap. Architectural journal aesthetic. Sophisticated typography, generous line spacing (1.5-1.8), clear figure-ground relationship",
    bestFor: "设计说明, 期刊投稿, 详细方案介绍, 文字密集型展板",
    structure: "多栏文字 + 嵌入式图片，图文交织",
    spacing: "文字行距1.5-1.8，段间距大于行距，图片与文字间距一致",
    composition: "顶部标题+摘要，中部多栏正文穿插效果图和平面，底部技术参数"
  },
  {
    id: 12,
    name: "竞赛正图·非对称张力",
    description: "打破均衡，一侧大图与另一侧信息簇形成动态张力，适合概念性强的艺术方案",
    vibe: "动态、张力、艺术感",
    keywords: "非对称, 动态张力, 打破均衡, 艺术感, 概念展板, 视觉焦点, 层次",
    prompt: "Asymmetric architectural presentation board with intentional imbalance. One large rendering or model photo occupies left 55-60% of board. Right side: dense cluster of smaller drawings, sketches, and text blocks. Overlapping layers on the right create depth. Dynamic visual tension between calm large image and busy right cluster. Artistic composition, concept board aesthetic. Breaking traditional grid balance intentionally",
    bestFor: "概念展板, 艺术装置提案, 竞赛概念图, 非传统建筑",
    structure: "一侧大图(55-60%) + 另一侧信息簇(40-45%)",
    spacing: "大图周围大量留白，信息簇紧凑但有内在对齐",
    composition: "左侧巨型效果图或渲染，右侧上下分块：上部分析图+下部平面/概念草图"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { boardLayouts };
}
