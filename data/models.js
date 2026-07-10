/* 翻牌卡池｜機型（真實產品照）＋零組件（圖示卡） */
/* type: model 機型 | part 零組件。每局隨機抽 6 張成對 */

const MEM_CARDS = [
  /* --- 機型卡（照片裁自 WALRUS 原廠教材） --- */
  { key: "TQ",   type: "model", img: "../assets/img/models/tq.webp",   name: "TQ400B",   sub: "電子穩壓加壓機",  desc: "電子穩壓設計，安靜低噪音" },
  { key: "GQ",   type: "model", img: "../assets/img/models/gq.webp",   name: "GQCN200",  sub: "迴水噴射式加壓機", desc: "迴水噴射式設計，排氣一流" },
  { key: "TP3",  type: "model", img: "../assets/img/models/tp3.webp",  name: "TP320PTB", sub: "塑鋼抽水機",      desc: "工程塑膠機身，永不生鏽" },
  { key: "TP8",  type: "model", img: "../assets/img/models/tp8.webp",  name: "TP820PTB", sub: "塑鋼加壓機",      desc: "內置逆止閥，壓力開關控制" },
  { key: "WQ",   type: "model", img: "../assets/img/models/wq.webp",   name: "WQ400B",   sub: "水冷式抗菌泵浦",  desc: "智能超靜音，台灣精品獎" },
  { key: "WAIC", type: "model", img: "../assets/img/models/waic.webp", name: "WAIC",     sub: "智慧聯網恆壓系統", desc: "聯網監控恆壓，台灣精品獎" },

  /* --- 零組件卡（圖示） --- */
  { key: "IMP", type: "part", name: "葉輪", sub: "Impeller", desc: "泵浦心臟，高速旋轉把能量甩給水流",
    svg: `<circle cx="50" cy="50" r="40" fill="#1d3a4d" stroke="#00c8ff" stroke-width="3"/>
          <g fill="#00c8ff"><path d="M50 50 L50 14 A36 36 0 0 1 76 26 Z"/><path d="M50 50 L86 50 A36 36 0 0 1 74 76 Z"/>
          <path d="M50 50 L50 86 A36 36 0 0 1 24 74 Z"/><path d="M50 50 L14 50 A36 36 0 0 1 26 24 Z"/></g>
          <circle cx="50" cy="50" r="9" fill="#ffd54a"/>` },
  { key: "SEAL", type: "part", name: "機械軸封", sub: "Mechanical Seal", desc: "防止水沿轉軸滲入線圈，空轉最先燒它",
    svg: `<circle cx="50" cy="50" r="36" fill="none" stroke="#c0c8d0" stroke-width="14"/>
          <circle cx="50" cy="50" r="36" fill="none" stroke="#4a5a68" stroke-width="4"/>
          <circle cx="50" cy="50" r="14" fill="#2a3540"/>` },
  { key: "TANK", type: "part", name: "壓力桶", sub: "Pressure Tank", desc: "壓縮空氣緩衝壓力，減少頻繁啟停",
    svg: `<ellipse cx="50" cy="50" rx="34" ry="42" fill="#f2f2f2" stroke="#8fa3b0" stroke-width="4"/>
          <ellipse cx="50" cy="32" rx="20" ry="9" fill="#fff" opacity=".8"/>
          <rect x="44" y="88" width="12" height="8" fill="#8fa3b0"/>` },
  { key: "CAP", type: "part", name: "啟動電容", sub: "Capacitor", desc: "單相馬達起跑的推手，換前先斷電放電",
    svg: `<rect x="28" y="20" width="44" height="60" rx="20" fill="#2a3540" stroke="#ffd54a" stroke-width="3"/>
          <line x1="42" y1="10" x2="42" y2="20" stroke="#ffd54a" stroke-width="4"/>
          <line x1="58" y1="10" x2="58" y2="20" stroke="#ffd54a" stroke-width="4"/>
          <text x="50" y="56" fill="#ffd54a" font-size="16" text-anchor="middle" font-weight="900">μF</text>` },
  { key: "CHK", type: "part", name: "逆止閥", sub: "Check Valve", desc: "水只准去不准回，防壓力回衝",
    svg: `<path d="M15 30 L48 50 L15 70 Z" fill="#00c8ff"/>
          <path d="M85 30 L52 50 L85 70 Z" fill="#33424e" stroke="#00c8ff" stroke-width="2"/>
          <line x1="50" y1="22" x2="50" y2="78" stroke="#ffd54a" stroke-width="5"/>` },
  { key: "FV", type: "part", name: "底閥", sub: "Foot Valve", desc: "裝在吸水管底端，停機時擋水不倒流",
    svg: `<rect x="30" y="18" width="40" height="30" rx="6" fill="#33424e" stroke="#c0c8d0" stroke-width="3"/>
          <path d="M30 55 L70 55 L60 82 L40 82 Z" fill="#4a5a68" stroke="#c0c8d0" stroke-width="3"/>
          <line x1="36" y1="70" x2="64" y2="70" stroke="#00c8ff" stroke-width="3"/>
          <line x1="38" y1="76" x2="62" y2="76" stroke="#00c8ff" stroke-width="3"/>` }
];
