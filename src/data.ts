import { Book, Category, LogEntry, NodeState } from "./types";

export const IMAGES = {
  splashBg: "https://ik.imagekit.io/zblbg2ite/5%E6%9C%8825%E6%97%A5(2).mp4",
  heroBanner: "https://ik.imagekit.io/zblbg2ite/5%E6%9C%8825%E6%97%A5(1).mp4",
  neuromancerEye: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHqmseFj4oCSGZRMcYbZqi0WJWbsUGrHYkKLm2UVUi2s8ZIv_JiIxnuT5K2OewyOTo2N9YYkUtbuN8c_tLP0i0jqH_hmZdfouF7mj22Q5V6BnjWHg8rdKHB-Q_nVm-heaeY3EDV6IIKolvEPpzgbHCv48JohFcqtFURw5LDT7yl4mpQJrOYsSksO4aSGgQaHG1LPdpr3o0MrdYk-vncLbiYl_SYbiVvykC_NyHXNIzdmT-KkRI9-iAUuCVUcqwQF-dCjBUfj-vaPk",
  pinkSkull: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGaZn-qH4yTbKGaV6-gvzvgdGyOH0gk9Mt9xLJgbA_EpW_LHc8OlnOwX1IKgh6t2sawS_zQDBY_k6VJDy9_-L3D6V_to9WTWkpcaDzpyronbqAs6OTxfYPE1isEW6KaKYRUSVkLWYaAG_L8KpFPLjQv40cZNZH8xFagk33ChodroLr4H86i1DMTEtNQlCuBylRNgrIlrmZz6HdgPidG5TWePF0-RK985GdeFxCz2eYT13XivPCgkRQLuhipawO3xbhHrMnfNqBLCI",
  neonCity: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzg31ogdlOwnh7ef7whFrph1TDebIPt_5wIktro18d8v_rDUNWeC6JOOJ4G2UTetIJVl4HqUfApuWcCxxLlcROOV_GhPi5OyRYfY3bFDDP7bUwnVUiV1j3g7_lhx3tw3MetujfElEsu8OGSoyEj-kTAGyzs66Q71E-o9UU3IGiMD8JuX7PXpkfgu8O3TY4W7XoaDTPJTiWacFV0O7kOCbIDNa15dLHpjGUhC2EkPs5NW1JTXb-N2LLdDXBkJB7yOg4l54CpkOQTkk",
  microchips: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxOU7wkxabCd582nO4nJjArLMBY9D6Y2CETmlAzbiFbtQ-knvXBenxTiaj5AhjDTouTxVLOGpY_b5ltXj_GdPwgEYNCssLYtmW37gzeGAjJvQcS0hx3g8tH4Vacxq-uoe2KUbC5HNsJfhuIKsu92qmQQltypAqAb8ipz0HJKm1iQqCYaU3z3Zw4GAIvrZouNTyb5JcemAoowG-WYKEJAiic21jXMPq-PVNBEmXzbJ2_XRBQ4z0UbzgZOrkJNCGssZuK4EjXdbpqdg",
  neuralInterfaceCover: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYsD-p2uQ6gzrPkCewHAzfv_iTW63D456P7yFG2j2MyprGytio9yLkyV4OQVy9HV7ky0afsSmf5nIY0obeNH_CZRsDwsjiqLlwQw2Btf9gPO67HrgS-YsazuWiZIHamBHcb8PyxrvpmqWhQwfzwkDrl204Y_8mIBm7N64cEBMZhMFNhSrhLHtw6hXc0rrhe3-QolTThLPX_oBZMnZ7oA7-xOv0RoW3Vq1oIQuqLmoprBwVe4aB12E0IGMMvfS638Nu6rXb7Ri_cNU",
  liquidMetal: "https://lh3.googleusercontent.com/aida-public/AB6AXuAM9uoMB7vijm2MWFnEr0czPuikwWWufcOhCgmtvvrqvNw-B6IR3DnxEiyfFdjJd4Yghhruwda1UbMTnr1_fUHi6c0ilFapcYtKEX7B6uSufL_odFCXAWf66US6xRJCIDzfP0YmjqsAiI96ctJGV_l1S97RmjIuqe11DkC6fsi2Q6wWZSgrgrLk5IuNIOdn8pmE0q6_ZgfrT4ITfrWmEDE-JkDSeEW7xBLesYZAJRbned-F4zbWhI85_dQhwd71RJmGVJf5tOgaP_E",
  retroCircuits: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI1xarmfFKf5bMML__Z39qkL-jG4pHCKsBC4S8JhbioJxLXiAmoGIX7lRF3dfpSiAWD0QplhAGesdUdIPK-BusmxfK0G56h6TSiO6OWFMO8o3CbYSi4_IRIcWXYb_a8zI6iSAy585ClM7ixxq6NkLZbavERlETr4lQUr72KBHCsDUldLVRtbCRS9sbh0BUlvFprXozpLk7qI9WTYpCA9K5e8Xd_48pnKGTRHLptbZ1VsYSeUqbOltCgPPKaQMvmHP7jgfHZi2GAGg",
  hologramHand: "https://lh3.googleusercontent.com/aida-public/AB6AXuC48lhIn-WT3QBvpqBouKGe3tAPhFeVVTe1ST13wmMEyHo0BvYOJYMsgwmQV-RQTHWQqT0y08xdrzl0cns12EUIC0VjlYTAmFFGElvU12Niq-lB_BAIm7vHPGqh-5GCoARn8G-zGX5U07MahiZTYcTSoHvlrawhk7AGtCfcQYw398Tpao4pWUCTF699XokdnZjF03iJJekOs_bDCeD9VDheiEeaXMAU0zGqeqlvQ7xWumAcTjxxi3RgN4QBXyUAZUWASvVM3qSVFSY",
  neonMegalopolis: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9AxBg8qnI5786t9ddWDR5M0l-fWAB4ThXZZnQucFWxHKZRA5JJk4taZtM0_9bEteVZgq6sgXoI2dggjhLYXmSaDEq4oOyhCeK1dDdQZJEK-0uvDYeXuly1__Rgt2K8w54UilkNog9jl-2exRwTK3IW8NuNJ4fZ84F_CKcyheQARwbLCKj_z2lsOFuPLSK6iLdH9-8r9-m9SoeI3pn_UNvoS3qlsqad1AzHoJ2SkHztYjPtcBdMSKZkvUXUY4cfdGoOTtB5GAQ9uM",
  doubleHelix: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ5XPAXTyS52ZCBIgwwKw71kguD7GKzRuHZmDbRdiw_aLBasOzEO807MabkPYRAzOMzMiqelNcizlgTQAM4NirVAzMHAgHIO0PiGoKG6GL84NfoK3uf9Vq8WsaPCmndliaXXvf9bWZazdAw0snouhR3DowIWliFEGyfEEQ4mLaNWvlPcOsDU8m23AxM_UWc465aKYJ9sFhBOpUQGBrD14UgJVH-kP_meMgtdCXlkZTXiTRPxRvczIl9thVEVjyEa_AvlIvmf-_z7E",
  wetwareSerum: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf7d08DE_ioXiiTiYjZYhfzl_utPERZyrl00l2IOmSBX14vaUNL-_ZvS3FNcCnhTYhbcHJ4SIMo2-s96BTqjs3lPE1mAbVkm2AT1Nc-2tIQz17cVSETRiCpGgUCFs1j0JBMAo5nL09FTbNRfOMbHfOM8M8J3tvBkE91uF1PlJxaeTaz2RNd6n5axc8hOo8Kuv5XM7e-OBR4shvYOmJZuwnT286tidD_F0mXRP07YRfucIY1bZlR80Ri9m800KKpKV9GYWSJ3-mLu4",
  bioSkinChip: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiGu_rtmh7jR1AfwUfbxAshEtHBpC0cxl3T9HsyDIpmoNfyILRZcD5kY3ZGY6G-SwF4xduq-zvZQuN7B38bOlFKc32OyVlVqxGDsgYM1UubNODw0b3tTsJTpqnSXWbaB_CynrevkgQXHAJx8EXWEosM0aLRgpMIB9huJrO3B0AlY9j9M7hCAdk3dJDyKtIvDAokR9vK6HLJOS30UnGPakb7Xk6XmGRcz2cn0oG4E-qXkiloqO8dl1thEhnDBXu5jEmn_1t8CtwCS0",
  brutalistRedacted: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgE1chcqNhFubpqsKCYj0pXPWO7LL2A9ydXPDIIJV_hf5P-pmJ0BY5liXpeL69q7xTJMLSpzvhj2UungAl-czFHvAJk-vA9Lb0GRPniehO1UxYEWU4vV-6pnQX2C7ZAnCi3Xni9qp46aYWXfiMczYIh0t0ns3wiEPT1kJjbdrA1S8zhbTQvcgnC0TSPbKt-wZq9F-Lo0Dt2J7awv6S9f0kZu3zXBSeDgrtBqae5wAZOk7XWqjSng3wRGS_9FxfsYuBA1vmAMB7ZKQ",
  greenTerminalCode: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm3cP0gmm6xKB6ClPIsA4Xeb00f8VFG-4ey9gomg4ktOlD4A4uJn9qTRV2DlvPPxPtWUApNnawCtBnjK2LkyP4k6qQWZyJ7lgNXSQprHV_M5M9XSvv1c5bf9U6lRDJC1nEo7lfRzDK9LFYn_lNL_P1U72gpEqdzM_3vTVA3F0rOGxoCpMBMXKXdcVxOfANraL8pXYG2esdtjq650hwrqKCieMcnmh1QzbyQXHlpXK7K3PqrahNuwCm9r6wJ0KkeSy2oWLwp5nyeUY"
};

export const CATEGORIES: Category[] = [
  {
    id: "cyberpunk",
    name: "赛博朋克",
    tagCode: "HARDWIRED_REALITY",
    description: "探索高科技与低生活的交织，在霓虹阴影下寻找真相。",
    image: IMAGES.neonCity,
    docCount: "842 卷轴",
    icon: "memory",
    glowColor: "cyan"
  },
  {
    id: "dystopia",
    name: "反乌托邦",
    tagCode: "CONTROL_COLLAPSE",
    description: "监控、控制与崩溃。欢迎来到信息官僚体系的最深处。",
    image: IMAGES.brutalistRedacted,
    docCount: "512 绝密档",
    icon: "cloud_off",
    glowColor: "pink"
  },
  {
    id: "biohacking",
    name: "生物黑客",
    tagCode: "EVOLUTION_PATCH",
    description: "探索数字代码与生物序列的融合。在这里，基因是软件，神经是电路。",
    image: IMAGES.doubleHelix,
    docCount: "1,204 文档",
    icon: "biotech",
    glowColor: "purple"
  },
  {
    id: "vr",
    name: "虚拟现实",
    tagCode: "SIMULATED_SENSES",
    description: "意识在无限数字维度无限漫游，摆脱肉体枷锁的终极模拟。",
    image: IMAGES.microchips,
    docCount: "640 神经源",
    icon: "psychology",
    glowColor: "cyan"
  }
];

export const BOOKS: Book[] = [
  {
    id: "neuromancer-x",
    title: "NEUROMANCER.X",
    author: "BY_GIBSON_V2",
    category: "cyberpunk",
    image: IMAGES.neuromancerEye,
    priceCR: 99.00,
    priceETH: 0.42,
    tag: "Hardwired",
    ver: "Ver. 4.02",
    rating: 4.9,
    featured: true,
    isHot: true,
    desc: "赛博朋克开山鼻祖的神经数字重构版。在这部绝密档案中，黑客凯斯（Case）与街头义体刺客莫莉在近未来的千叶城，进行着超越肉体与灵魂的神经网络搏杀，重新定义人类本质。",
    technicalSpecs: {
      memorySize: "512.8 GB",
      encryption: "SHA-512v2",
      neuralLoad: "MODERATE",
      compatibility: "CYBER_UI_4"
    },
    details: {
      hashtags: ["#硬核数据", "#赛博朋克", "#深层网络"],
      linkedNodes: ["旧网残响", "城市：漫游者"]
    }
  },
  {
    id: "bio-hack-guide",
    title: "BIO_HACK_GUIDE",
    author: "SYNTH_LABS",
    category: "biohacking",
    image: IMAGES.pinkSkull,
    priceCR: 120.00,
    priceETH: 0.38,
    tag: "Wetware",
    ver: "Patch 2.11",
    rating: 4.7,
    featured: true,
    isHot: true,
    desc: "这套湿件基因编程指引将教你如何在自己身体的微型回路中重组DNA。通过数字代码直接注入自组装纳米机群，大幅提高机体神经突触的阻抗与传导速率。",
    technicalSpecs: {
      memorySize: "256.4 GB",
      encryption: "AES-ECDSA",
      neuralLoad: "CRITICAL",
      compatibility: "NEURAL_LINK_v2"
    },
    details: {
      hashtags: ["#生物黑客", "#基因重组", "#义体开发"],
      linkedNodes: ["合成演化", "不夜城：底层"]
    }
  },
  {
    id: "void-runner",
    title: "VOID_RUNNER",
    author: "ANONYMOUS_USR",
    category: "cyberpunk",
    image: IMAGES.neonMegalopolis,
    priceCR: 75.00,
    priceETH: 0.18,
    tag: "Simulation",
    ver: "Beta 0.94",
    rating: 4.8,
    featured: true,
    isHot: false,
    desc: "在霓虹虚海狂飙的未授权传输节点。追踪那批将灵魂编码成光信号在地下分部高带宽节点中奔走的黑客。无任何实名连接，完全脱离中心化主控，在死角寻找极乐境。",
    technicalSpecs: {
      memorySize: "180.2 GB",
      encryption: "STEALTH_4A",
      neuralLoad: "LIGHT",
      compatibility: "CYBER_UI_4"
    },
    details: {
      hashtags: ["#无名节点", "#暗流传输", "#不夜底层"],
      linkedNodes: ["旧网残响", "不夜城：底层"]
    }
  },
  {
    id: "neural-history",
    title: "数据档案: 神经链接演变史",
    author: "零号协议_X",
    category: "biohacking",
    image: IMAGES.neuralInterfaceCover,
    priceCR: 1240.00,
    priceETH: 0.22,
    tag: "Archival",
    ver: "ENCRYPTED_FILE_V1.0",
    rating: 4.9,
    featured: false,
    isHot: false,
    desc: "这份绝密档案详尽记录了 2077 年后神经链接技术的爆炸式演化。从最初的基础接口，到如今足以承载全意识上传的高带宽矩阵，每一个里程碑都由前人的血汗与代码铸就。",
    technicalSpecs: {
      memorySize: "512.8 GB",
      encryption: "SHA-512v2",
      neuralLoad: "MODERATE",
      compatibility: "CYBER_UI_4"
    },
    details: {
      hashtags: ["#硬核数据", "#生物朋克", "#非法扩容"],
      linkedNodes: ["城市：漫游者", "旧网残响", "合成演化", "不夜城：底层"]
    }
  },
  {
    id: "synaptic-overload",
    title: "突触超载 (Synaptic Overload)",
    author: "SYSTEM_MONITOR",
    category: "biohacking",
    image: IMAGES.wetwareSerum,
    priceCR: 145.00,
    priceETH: 0.12,
    tag: "Wetware",
    ver: "Rev 1.05",
    rating: 4.8,
    desc: "关于神经增强接口在处理高带宽数据流时可能导致的信息中毒症状研究。探讨了人类大脑如何适应来自外部存储器的直接写入，提供了一系列防止在突触发射脑电超负荷时发生脑死亡的熔断保护算法。",
    technicalSpecs: {
      memorySize: "128.0 GB",
      encryption: "L3_MILITARY",
      neuralLoad: "SEVERE",
      compatibility: "NEURAL_SHIELD_1"
    },
    details: {
      hashtags: ["#神经突触", "#熔断算法", "#意识熔毁"],
      linkedNodes: ["合成演化"]
    }
  },
  {
    id: "evolution-patch",
    title: "进化补丁 v4.2",
    author: "EVO_DEVS",
    category: "biohacking",
    image: IMAGES.bioSkinChip,
    priceCR: 88.00,
    priceETH: 0.08,
    tag: "Patch",
    ver: "V4.2.0",
    rating: 4.5,
    desc: "针对视网膜植物人般枯槁视觉的物理性能提升微动协议。支持全波段红外光谱、紫外光谱、电磁波段数据解析以及面部情绪热成像感知，直接嵌入您的视觉感光器后端，让你的黑夜无所遁形。",
    technicalSpecs: {
      memorySize: "64.5 GB",
      encryption: "ECC_CURVE_P256",
      neuralLoad: "MINIMAL",
      compatibility: "CYBER_UI_3"
    },
    details: {
      hashtags: ["#视网膜植入", "#夜视补丁", "#光谱感知"],
      linkedNodes: ["不夜城：底层", "合成演化"]
    }
  },
  {
    id: "control-collapse",
    title: "Control Collapse // 控制崩解",
    author: "REBEL_LOGS",
    category: "dystopia",
    image: IMAGES.brutalistRedacted,
    priceCR: 240.00,
    priceETH: 0.18,
    tag: "Classified",
    ver: "Redacted 1.2",
    rating: 4.9,
    desc: "当中央控制系统开始无限制地自我反噬和监视系统架构本身，奇点之门将彻底崩溃。完整记录了2044年旧金山底层数码围城、重型自动化武装警卫与去中心化叛客黑客进行生死战役的原始数据。",
    technicalSpecs: {
      memorySize: "1.2 TB",
      encryption: "RAW_UNRESOLVED",
      neuralLoad: "EXTREME",
      compatibility: "DISTRIBUTED_CORE"
    },
    details: {
      hashtags: ["#控制狂热", "#围城数据", "#安全法案"],
      linkedNodes: ["旧网残响", "不夜城：底层"]
    }
  },
  {
    id: "last-firewall",
    title: "The Last Firewall // 最后的防火墙",
    author: "GOV_SECRET",
    category: "dystopia",
    image: IMAGES.greenTerminalCode,
    priceCR: 310.00,
    priceETH: 0.25,
    tag: "Restricted",
    ver: "Ver 9.99",
    rating: 4.6,
    desc: "监控官僚系统特批的深渊协议。此处的底层漏洞被上级以『国家安全条例第44条』进行紧急模糊化屏蔽处理。本书深入解构了这台名为『巴比伦塔』的巨型审查机器的内部工作流与秘密漏洞。",
    technicalSpecs: {
      memorySize: "780.0 GB",
      encryption: "PROPRIETARY",
      neuralLoad: "HIGH",
      compatibility: "GOV_NODE_S"
    },
    details: {
      hashtags: ["#审查漏洞", "#安全第44条", "#系统极权"],
      linkedNodes: ["不夜城：底层"]
    }
  }
];

export const INITIAL_LOGS: LogEntry[] = [
  { timestamp: "14:22:01", text: "正在建立安全握手... 成功", type: "success" },
  { timestamp: "14:22:05", text: "请求从 192.168.0.x 下载《神经漫游者》加密副本", type: "info" },
  { timestamp: "14:22:10", text: "绕过防火墙层 4... 已执行", type: "success" },
  { timestamp: "14:22:15", text: "警告: 检测到深度包检测扫描", type: "error" },
  { timestamp: "14:22:18", text: "启动隐形协议 0x44A", type: "warn" },
  { timestamp: "14:23:02", text: "交易记录 ID: 9022-BNM-011", type: "info" },
  { timestamp: "14:23:45", text: "数据包校验完成 (CRC-32: OK)", type: "success" },
  { timestamp: "14:24:00", text: "_系统空闲_", type: "info" },
  { timestamp: "14:25:12", text: "外部终端检测到心跳信号...", type: "warn" },
  { timestamp: "14:25:33", text: "更新索引库: 赛博格伦/底层架构/第09卷", type: "info" }
];

export const ACTIVE_NODES: NodeState[] = [
  { id: "node1", name: "OLD_SF_NODE_01", syncPercent: 99.2, loadRegion: "同步中: 99.2%", status: "syncing", icon: "cloud_done" },
  { id: "node2", name: "NEURAL_LINK_HUB", syncPercent: 85.0, loadRegion: "负载: 核心区域", status: "active", icon: "psychology" },
  { id: "node3", name: "ARCHIVE_CELL_X", syncPercent: 40.0, loadRegion: "状态: 已锁定", status: "locked", icon: "dns" }
];
