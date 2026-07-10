/* G2 拆解重組｜零件資料（座標對應 SVG viewBox 0 0 800 520） */
/* level: basic=基礎必考 5 件, pro=技師加考 2 件 */

const PARTS = [
  {
    id: "tank", name: "壓力桶", level: "basic",
    zone: { x: 85, y: 40, w: 170, h: 150 },
    note: "儲存壓縮空氣緩衝壓力，馬達不用一直起動，壽命才長。",
    svg: `<ellipse cx="50" cy="50" rx="42" ry="46" fill="#f2f2f2" stroke="#8fa3b0" stroke-width="4"/>
          <ellipse cx="50" cy="30" rx="26" ry="10" fill="#fff" opacity=".7"/>
          <rect x="44" y="90" width="12" height="8" fill="#8fa3b0"/>`
  },
  {
    id: "impeller", name: "葉輪", level: "basic",
    zone: { x: 105, y: 265, w: 130, h: 130 },
    note: "泵浦的心臟！高速旋轉把能量甩給水流。",
    svg: `<circle cx="50" cy="50" r="40" fill="#1d3a4d" stroke="#00c8ff" stroke-width="3"/>
          <g fill="#00c8ff"><path d="M50 50 L50 14 A36 36 0 0 1 76 26 Z"/><path d="M50 50 L86 50 A36 36 0 0 1 74 76 Z"/>
          <path d="M50 50 L50 86 A36 36 0 0 1 24 74 Z"/><path d="M50 50 L14 50 A36 36 0 0 1 26 24 Z"/></g>
          <circle cx="50" cy="50" r="9" fill="#ffd54a"/>`
  },
  {
    id: "seal", name: "機械軸封", level: "basic",
    zone: { x: 255, y: 300, w: 60, h: 60 },
    note: "擋住水不讓它沿轉軸流進線圈。空轉最先燒的就是它！",
    svg: `<circle cx="50" cy="50" r="36" fill="none" stroke="#c0c8d0" stroke-width="14"/>
          <circle cx="50" cy="50" r="36" fill="none" stroke="#4a5a68" stroke-width="4"/>
          <circle cx="50" cy="50" r="14" fill="#2a3540"/>`
  },
  {
    id: "motor", name: "馬達（定子+轉子）", level: "basic",
    zone: { x: 330, y: 250, w: 270, h: 160 },
    note: "定子磁場拖著轉子跑——感應馬達的看家本領。",
    svg: `<rect x="12" y="30" width="76" height="44" rx="8" fill="#33424e" stroke="#00c8ff" stroke-width="2"/>
          <g stroke="#00c8ff" stroke-width="3"><line x1="22" y1="30" x2="22" y2="74"/><line x1="34" y1="30" x2="34" y2="74"/>
          <line x1="46" y1="30" x2="46" y2="74"/><line x1="58" y1="30" x2="58" y2="74"/><line x1="70" y1="30" x2="70" y2="74"/></g>
          <rect x="88" y="44" width="10" height="16" fill="#8fa3b0"/>`
  },
  {
    id: "cap", name: "啟動電容", level: "basic",
    zone: { x: 430, y: 185, w: 80, h: 55 },
    note: "單相馬達起跑的推手。換它之前，先斷電再放電！",
    svg: `<rect x="25" y="20" width="50" height="62" rx="22" fill="#2a3540" stroke="#ffd54a" stroke-width="3"/>
          <line x1="42" y1="10" x2="42" y2="20" stroke="#ffd54a" stroke-width="4"/>
          <line x1="58" y1="10" x2="58" y2="20" stroke="#ffd54a" stroke-width="4"/>
          <text x="50" y="58" fill="#ffd54a" font-size="16" text-anchor="middle" font-weight="900">μF</text>`
  },
  {
    id: "check", name: "逆止閥", level: "pro",
    zone: { x: 300, y: 65, w: 80, h: 60 },
    note: "水只准去不准回，壓力回衝就靠它擋。",
    svg: `<path d="M15 30 L48 50 L15 70 Z" fill="#00c8ff"/>
          <path d="M85 30 L52 50 L85 70 Z" fill="#33424e" stroke="#00c8ff" stroke-width="2"/>
          <line x1="50" y1="22" x2="50" y2="78" stroke="#ffd54a" stroke-width="5"/>`
  },
  {
    id: "pswitch", name: "壓力開關", level: "pro",
    zone: { x: 420, y: 65, w: 70, h: 60 },
    note: "壓力到頂自動停、掉底自動開——泵浦的自動駕駛。",
    svg: `<rect x="22" y="30" width="56" height="46" rx="6" fill="#33424e" stroke="#c0c8d0" stroke-width="3"/>
          <circle cx="50" cy="53" r="14" fill="#1d2a34" stroke="#ffd54a" stroke-width="2"/>
          <line x1="50" y1="53" x2="58" y2="43" stroke="#ffd54a" stroke-width="3"/>
          <rect x="42" y="18" width="16" height="12" fill="#8fa3b0"/>`
  }
];
