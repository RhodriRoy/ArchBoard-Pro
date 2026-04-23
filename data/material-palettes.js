const materialPalettes = [
  {
    id: 1,
    name: "清水混凝土 Raw Concrete",
    description: "混凝土与木、钢的诚实对话，粗野主义的核心",
    materials: [
      { name: "清水混凝土", color: "#8C8C8C", texture: "粗糙模板纹理" },
      { name: "原木", color: "#C4A77D", texture: "自然木纹" },
      { name: "耐候钢", color: "#B87333", texture: "锈蚀表面" }
    ],
    vibe: "原始、诚实、力量",
    bestFor: "粗野主义, 极简主义, 博物馆, 文化中心",
    architects: "安藤忠雄, 路易·康, 勒·柯布西耶"
  },
  {
    id: 2,
    name: "玻璃幕墙 Glass Curtain",
    description: "超白玻璃与钢结构的透明美学",
    materials: [
      { name: "超白玻璃", color: "#E8F4FC", texture: "高透光低反射" },
      { name: "铝框", color: "#C0C0C0", texture: "阳极氧化/氟碳喷涂" },
      { name: "钢结构", color: "#4A4A4A", texture: "喷砂/防火涂料" }
    ],
    vibe: "通透、轻盈、现代",
    bestFor: "摩天楼, 办公楼, 现代住宅, 展览空间",
    architects: "密斯·凡德罗, 诺曼·福斯特, SOM"
  },
  {
    id: 3,
    name: "红砖砌体 Red Brick",
    description: "红砖与黑钢、橡木的经典组合",
    materials: [
      { name: "红砖", color: "#A0522D", texture: "清水砖缝" },
      { name: "黑钢", color: "#2C2C2C", texture: "哑光黑漆" },
      { name: "橡木", color: "#D4A574", texture: "自然木纹" }
    ],
    vibe: "温暖、复古、工业",
    bestFor: "Loft, 工厂改造, 学校, 文化建筑",
    architects: "大卫·奇普菲尔德, 赫尔佐格&德梅隆"
  },
  {
    id: 4,
    name: "白石材 White Stone",
    description: "大理石/石灰石与黄铜的奢华搭配",
    materials: [
      { name: "白色大理石", color: "#F5F5F0", texture: "卡拉拉/雅士白" },
      { name: "黄铜", color: "#D4AF37", texture: "拉丝/镜面" },
      { name: "深色木", color: "#5C4033", texture: "胡桃木/烟熏橡木" }
    ],
    vibe: "奢华、典雅、精致",
    bestFor: "酒店, 高端住宅, 美术馆, 精品店",
    architects: "卡洛·斯卡帕, 彼得·卒姆托"
  },
  {
    id: 5,
    name: "夯土 Rammed Earth",
    description: "夯土与竹、原石的地域智慧",
    materials: [
      { name: "夯土", color: "#C4A77D", texture: "分层夯实纹理" },
      { name: "竹", color: "#8FBC8F", texture: "竹编/竹格栅" },
      { name: "原石", color: "#8B7355", texture: "自然石面" }
    ],
    vibe: "质朴、在地、可持续",
    bestFor: "乡村建筑, 生态住宅, 民宿, 文化建筑",
    architects: "王澍, 武重义, 弗朗西斯·凯雷"
  },
  {
    id: 6,
    name: "锈蚀钢 Corten Steel",
    description: "耐候钢的锈色与玻璃、混凝土的对比",
    materials: [
      { name: "耐候钢", color: "#B87333", texture: "自然锈蚀层" },
      { name: "玻璃", color: "#E0E8F0", texture: "低铁超白" },
      { name: "混凝土", color: "#A0A0A0", texture: "清水/磨光" }
    ],
    vibe: "工业、时间、对比",
    bestFor: "雕塑建筑, 景观小品, 桥梁, 外墙",
    architects: "理查德·塞拉, 伦佐·皮亚诺"
  },
  {
    id: 7,
    name: "竹材 Bamboo",
    description: "竹、纸、木格栅的东方轻盈",
    materials: [
      { name: "竹", color: "#8FBC8F", texture: "竹编/竹片" },
      { name: "和纸", color: "#F5F0E8", texture: "半透明障子" },
      { name: "木格栅", color: "#C4A77D", texture: "细木条编织" }
    ],
    vibe: "轻盈、自然、通透",
    bestFor: "茶室, 日式住宅,  pavilion, 景观",
    architects: "隈研吾, 坂茂, 武重义"
  },
  {
    id: 8,
    name: "黑钢框架 Black Steel",
    description: "黑钢与玻璃、深色木的精致工业感",
    materials: [
      { name: "黑钢", color: "#1A1A1A", texture: "粉末涂层/发黑" },
      { name: "玻璃", color: "#E8F4FC", texture: "钢化透明" },
      { name: "深色木", color: "#3C2F2F", texture: "烟熏橡木/碳化木" }
    ],
    vibe: "精致、工业、克制",
    bestFor: "现代住宅, 商业空间, 家具, 细部",
    architects: "让·努维尔, 奥利维耶·帕尔默"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { materialPalettes };
}
