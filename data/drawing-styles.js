const drawingStyles = [
  {
    id: 1,
    name: "线稿 Line Drawing",
    description: "精确的CAD线条，技术感强，信息清晰",
    vibe: "精确、技术、理性",
    keywords: "线稿, CAD, 精确, 技术, 理性, 平面图, 立面图, 线条, 二维",
    prompt: "Precise line drawing style, CAD-quality thin uniform lines, technical architectural drawing, plan/section/elevation views, black lines on white background, no shading, crisp edges, professional drafting aesthetic",
    bestFor: "施工图, 分析图, 概念草图",
    tools: "CAD, Illustrator",
    lineWeight: "0.18-0.5mm"
  },
  {
    id: 2,
    name: "铅笔素描 Sketch",
    description: "手绘草图，概念阶段，充满设计过程感",
    vibe: "手绘、概念、过程",
    keywords: "铅笔, 素描, 手绘, 草图, 概念, 过程, 粗糙, 快速表达",
    prompt: "Pencil sketch style, hand-drawn architectural sketch, loose gestural lines, construction lines visible, shading with hatching and cross-hatching, design process feel, graphite texture, conceptual phase drawing",
    bestFor: "概念设计, 草图表达, 设计过程记录",
    tools: "铅笔, 炭笔, Procreate",
    lineWeight: "变化丰富"
  },
  {
    id: 3,
    name: "水彩渲染 Watercolor",
    description: "柔和透明，艺术化表达，氛围感强",
    vibe: "柔和、艺术、氛围",
    keywords: "水彩, 渲染, 柔和, 透明, 艺术, 氛围, 手绘, 色彩",
    prompt: "Watercolor architectural rendering, soft transparent washes, bleeding edges, artistic expression, atmospheric quality, hand-painted feel, muted color palette, paper texture visible, loose and expressive",
    bestFor: "效果图, 氛围表达, 竞赛图",
    tools: "水彩, Photoshop笔刷",
    lineWeight: "柔和边界"
  },
  {
    id: 4,
    name: "数字写实 Digital Realistic",
    description: "V-Ray/Enscape照片级渲染，追求真实",
    vibe: "真实、精致、商业",
    keywords: "写实, 照片级, V-Ray, Enscape, 3D渲染, 真实, 精致, 商业",
    prompt: "Photorealistic digital rendering, V-Ray or Enscape quality, accurate materials and lighting, realistic shadows and reflections, detailed entourage, atmospheric perspective, commercial presentation quality",
    bestFor: "最终效果图, 客户汇报, 宣传",
    tools: "V-Ray, Enscape, Lumion",
    lineWeight: "无线条"
  },
  {
    id: 5,
    name: "拼贴表现 Collage",
    description: "Photoshop拼贴，快速概念，材质叠加",
    vibe: "快速、概念、实验",
    keywords: "拼贴, Photoshop, 快速, 概念, 材质, 叠加, 剪切, 蒙版",
    prompt: "Architectural collage style, cut-and-paste composition, mixed media, photographic elements combined with hand-drawn marks, texture overlays, masking and blending, quick conceptual expression, experimental visual language",
    bestFor: "概念阶段, 快速表达, 材料研究",
    tools: "Photoshop, 手工拼贴",
    lineWeight: "混合"
  },
  {
    id: 6,
    name: "轴测插画 Axonometric",
    description: "等角透视，信息清晰，无透视变形",
    vibe: "清晰、技术、信息",
    keywords: "轴测, 等角, 透视, 信息, 技术, 清晰, 分解, 构件",
    prompt: "Axonometric illustration style, isometric projection, no perspective distortion, all parallel lines remain parallel, 30-degree angles, clear spatial information, technical yet illustrative, cutaway views",
    bestFor: "空间分析, 构造展示, 说明书插图",
    tools: "CAD, Illustrator, Vectorworks",
    lineWeight: "统一"
  },
  {
    id: 7,
    name: "剖透视 Section-Perspective",
    description: "剖面+透视结合，展示内部空间体验",
    vibe: "空间、体验、层次",
    keywords: "剖透视, 剖面, 透视, 内部空间, 体验, 层次, 空间序列",
    prompt: "Sectional perspective drawing, combination of cut section and perspective view, interior spatial experience revealed, depth and layering, people and activity shown inside, atmospheric interior lighting",
    bestFor: "空间展示, 内部体验, 剖面分析",
    tools: "Rhino, CAD + Photoshop",
    lineWeight: "剖切线粗，内部细"
  },
  {
    id: 8,
    name: "图解 Diagram",
    description: "箭头、图标、简化图形，信息可视化",
    vibe: "分析、清晰、抽象",
    keywords: "图解, 分析, 箭头, 图标, 简化, 抽象, 信息, 可视化",
    prompt: "Diagrammatic drawing style, simplified geometric forms, arrows and icons, color-coded information, bubble diagrams, flow charts, sun paths, wind analysis, abstract representation of complex ideas",
    bestFor: "分析图, 概念图解, 数据可视化",
    tools: "Illustrator, Rhino, Grasshopper",
    lineWeight: "简洁"
  },
  {
    id: 9,
    name: "水墨 Ink Wash",
    description: "东方意境，黑白灰层次，留白",
    vibe: "东方、意境、留白",
    keywords: "水墨, 东方, 意境, 黑白灰, 留白, 毛笔, 渲染, 传统",
    prompt: "Chinese ink wash architectural drawing, black and white gray tones, brush stroke texture, Eastern aesthetic, intentional blank space (留白), atmospheric depth, calligraphic line quality, traditional Chinese painting influence",
    bestFor: "中式项目, 概念表达, 艺术化图纸",
    tools: "毛笔, 水墨, Procreate",
    lineWeight: "毛笔变化"
  },
  {
    id: 10,
    name: "线框白模 Wireframe",
    description: "纯粹的形态研究，无材质无颜色",
    vibe: "纯粹、研究、形态",
    keywords: "线框, 白模, 纯粹, 形态, 研究, 三维, 结构, 无材质",
    prompt: "Wireframe white model style, pure geometric form study, no materials or colors, white or light gray surfaces, visible edges and construction lines, massing model aesthetic, form-finding presentation",
    bestFor: "形态研究, 体量分析, 概念模型",
    tools: "Rhino, SketchUp, 3D打印",
    lineWeight: "清晰轮廓线"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { drawingStyles };
}
