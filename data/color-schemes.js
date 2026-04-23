const colorSchemes = [
  {
    id: 1,
    name: "混凝土单色调 Concrete Mono",
    category: "材料系",
    description: "灰度系配色，粗野主义与极简主义的专属语言",
    colors: {
      primary: "#8C8C8C", onPrimary: "#FFFFFF",
      secondary: "#B0B0B0", onSecondary: "#1A1A1A",
      accent: "#C45C26", onAccent: "#FFFFFF",
      background: "#E8E8E8", foreground: "#2C2C2C",
      card: "#F0F0F0", cardForeground: "#2C2C2C",
      muted: "#D4D4D4", mutedForeground: "#6B6B6B",
      border: "#C0C0C0", destructive: "#8B0000",
      onDestructive: "#FFFFFF", ring: "#8C8C8C"
    },
    notes: "清水混凝土的灰度层次，点缀锈橙色强调"
  },
  {
    id: 2,
    name: "暖木大地色 Warm Timber",
    category: "自然系",
    description: "橡木、陶土、米色，温暖的自然感受",
    colors: {
      primary: "#D4A574", onPrimary: "#1A1A1A",
      secondary: "#C4A77D", onSecondary: "#1A1A1A",
      accent: "#8B6914", onAccent: "#FFFFFF",
      background: "#FFF8F0", foreground: "#4A3728",
      card: "#FFFFFF", cardForeground: "#4A3728",
      muted: "#F5E6D0", mutedForeground: "#8B7355",
      border: "#E8D5C0", destructive: "#8B4513",
      onDestructive: "#FFFFFF", ring: "#D4A574"
    },
    notes: "北欧与日式建筑的温暖基底"
  },
  {
    id: 3,
    name: "高对比黑白 High Contrast B&W",
    category: "经典系",
    description: "建筑图纸的经典配色，永恒且有力",
    colors: {
      primary: "#1A1A1A", onPrimary: "#FFFFFF",
      secondary: "#4A4A4A", onSecondary: "#FFFFFF",
      accent: "#E63946", onAccent: "#FFFFFF",
      background: "#FAFAFA", foreground: "#1A1A1A",
      card: "#FFFFFF", cardForeground: "#1A1A1A",
      muted: "#E0E0E0", mutedForeground: "#6B6B6B",
      border: "#D0D0D0", destructive: "#000000",
      onDestructive: "#FFFFFF", ring: "#1A1A1A"
    },
    notes: "黑、白、灰三阶，红色作为标注强调"
  },
  {
    id: 4,
    name: "柔和粉彩 Pastel Soft",
    category: "艺术系",
    description: "马卡龙色调，轻盈梦幻，概念图常用",
    colors: {
      primary: "#A8DADC", onPrimary: "#1A1A1A",
      secondary: "#F1FAEE", onSecondary: "#1A1A1A",
      accent: "#FFB4A2", onAccent: "#1A1A1A",
      background: "#F8F9FA", foreground: "#457B9D",
      card: "#FFFFFF", cardForeground: "#457B9D",
      muted: "#E8F0F2", mutedForeground: "#6B8CAE",
      border: "#D8E8EC", destructive: "#E07A5F",
      onDestructive: "#FFFFFF", ring: "#A8DADC"
    },
    notes: "浅蓝、薄荷、珊瑚粉，适合水彩风概念图"
  },
  {
    id: 5,
    name: "工业冷调 Industrial Cool",
    category: "材料系",
    description: "钢蓝、铝灰、冷白，高技派与工业风的冷峻",
    colors: {
      primary: "#457B9D", onPrimary: "#FFFFFF",
      secondary: "#6C8EAD", onSecondary: "#FFFFFF",
      accent: "#E07A5F", onAccent: "#FFFFFF",
      background: "#F0F4F8", foreground: "#1D3557",
      card: "#FFFFFF", cardForeground: "#1D3557",
      muted: "#E0E8F0", mutedForeground: "#5A7A96",
      border: "#C8D6E5", destructive: "#8B0000",
      onDestructive: "#FFFFFF", ring: "#457B9D"
    },
    notes: "钢结构的冷蓝灰调，暖橙作为设备管道色"
  },
  {
    id: 6,
    name: "热带活力 Tropical Vibrant",
    category: "地域系",
    description: "翠绿、天蓝、明黄，热带建筑的阳光感",
    colors: {
      primary: "#2A9D8F", onPrimary: "#FFFFFF",
      secondary: "#4ECDC4", onSecondary: "#1A1A1A",
      accent: "#FFD93D", onAccent: "#1A1A1A",
      background: "#F0FDF4", foreground: "#1A3C34",
      card: "#FFFFFF", cardForeground: "#1A3C34",
      muted: "#DCFCE7", mutedForeground: "#2A7A6E",
      border: "#BBF7D0", destructive: "#E74C3C",
      onDestructive: "#FFFFFF", ring: "#2A9D8F"
    },
    notes: "绿植、天空、阳光，东南亚/拉美建筑"
  },
  {
    id: 7,
    name: "北欧 muted Nordic Muted",
    category: "自然系",
    description: "雾蓝、灰绿、暖白，斯堪的纳维亚的沉静",
    colors: {
      primary: "#6B9080", onPrimary: "#FFFFFF",
      secondary: "#A4C3B2", onSecondary: "#1A1A1A",
      accent: "#D4A574", onAccent: "#1A1A1A",
      background: "#F6FFF8", foreground: "#354F52",
      card: "#FFFFFF", cardForeground: "#354F52",
      muted: "#E8F0EC", mutedForeground: "#6B8E7A",
      border: "#D0E0D4", destructive: "#8B4513",
      onDestructive: "#FFFFFF", ring: "#6B9080"
    },
    notes: "雾蓝灰绿的自然色调，暖木色点缀"
  },
  {
    id: 8,
    name: "侘寂 Wabi-Sabi",
    category: "东方系",
    description: "陶土、苔绿、炭黑、亚麻，不完美的美学",
    colors: {
      primary: "#8B7355", onPrimary: "#FFFFFF",
      secondary: "#A09080", onSecondary: "#FFFFFF",
      accent: "#4A6741", onAccent: "#FFFFFF",
      background: "#F5F0E8", foreground: "#2C3E2D",
      card: "#FFFFFF", cardForeground: "#2C3E2D",
      muted: "#E8E2D6", mutedForeground: "#7A8B7B",
      border: "#D4C9B9", destructive: "#5C4033",
      onDestructive: "#FFFFFF", ring: "#8B7355"
    },
    notes: "大地色系，强调材质肌理和不完美"
  },
  {
    id: 9,
    name: "午夜蓝图 Midnight Blueprint",
    category: "经典系",
    description: "蓝图蓝+白线，建筑师的经典图纸语言",
    colors: {
      primary: "#0066CC", onPrimary: "#FFFFFF",
      secondary: "#4A90E2", onSecondary: "#FFFFFF",
      accent: "#FFFFFF", onAccent: "#0066CC",
      background: "#001A33", foreground: "#E0E8F0",
      card: "#002A4D", cardForeground: "#E0E8F0",
      muted: "#003A66", mutedForeground: "#7AA8D4",
      border: "#004A80", destructive: "#FF4444",
      onDestructive: "#FFFFFF", ring: "#0066CC"
    },
    notes: "深蓝底+白线+蓝线，经典蓝图配色"
  },
  {
    id: 10,
    name: "沙漠金 Desert Gold",
    category: "地域系",
    description: "沙色、赭石、暖灰，沙漠与土坯建筑",
    colors: {
      primary: "#C4A77D", onPrimary: "#1A1A1A",
      secondary: "#D4B896", onSecondary: "#1A1A1A",
      accent: "#8B6914", onAccent: "#FFFFFF",
      background: "#F8F4ED", foreground: "#4A3728",
      card: "#FFFFFF", cardForeground: "#4A3728",
      muted: "#F0E8D8", mutedForeground: "#8B7355",
      border: "#E0D0B8", destructive: "#8B4513",
      onDestructive: "#FFFFFF", ring: "#C4A77D"
    },
    notes: "摩洛哥、中东、美国西南部的沙漠色调"
  },
  {
    id: 11,
    name: "森林绿 Forest Green",
    category: "自然系",
    description: "深绿、苔藓、原木，融入森林的建筑",
    colors: {
      primary: "#2D6A4F", onPrimary: "#FFFFFF",
      secondary: "#40916C", onSecondary: "#FFFFFF",
      accent: "#D4A574", onAccent: "#1A1A1A",
      background: "#F0F7F4", foreground: "#1B4332",
      card: "#FFFFFF", cardForeground: "#1B4332",
      muted: "#D8F3DC", mutedForeground: "#52796F",
      border: "#B7E4C7", destructive: "#8B0000",
      onDestructive: "#FFFFFF", ring: "#2D6A4F"
    },
    notes: "亲生物建筑、树屋、森林住宅的配色"
  },
  {
    id: 12,
    name: "霓虹赛博 Neon Cyber",
    category: "概念系",
    description: "洋红、青绿、深黑，概念建筑的未来感",
    colors: {
      primary: "#FF00FF", onPrimary: "#0A0A0F",
      secondary: "#00FFFF", onSecondary: "#0A0A0F",
      accent: "#FFFF00", onAccent: "#0A0A0F",
      background: "#0A0A0F", foreground: "#F0F0F5",
      card: "#141420", cardForeground: "#F0F0F5",
      muted: "#1E1E30", mutedForeground: "#7A7A8A",
      border: "#2A2A40", destructive: "#FF0040",
      onDestructive: "#FFFFFF", ring: "#FF00FF"
    },
    notes: "赛博朋克风格概念图，适合参数化/未来主义"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { colorSchemes };
}
