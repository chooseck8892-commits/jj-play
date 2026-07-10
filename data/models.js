/* 機型卡牌資料（G3 記憶翻牌）｜來源：WALRUS 泵浦概述教材、正久200問 */
/* icon: booster 加壓機 | intake 抽水機 | jet 噴射式 | sub 沉水泵 | seal 軸封 | tank 壓力桶 */

// 基礎版：6 對「同圖配對」（系列 + 圖示）
const MEM_BASIC = [
  { key: "TQ",  name: "TQ 系列",  sub: "電子式加壓機",   icon: "booster", color: "#0e4c92" },
  { key: "HQ",  name: "HQ 系列",  sub: "加壓機",         icon: "booster", color: "#f5871f" },
  { key: "GQ",  name: "GQ 系列",  sub: "迴水噴射式",     icon: "jet",     color: "#2e9e5b" },
  { key: "TP3", name: "TP3 系列", sub: "塑鋼抽水機",     icon: "intake",  color: "#8e44ad" },
  { key: "TP8", name: "TP8 系列", sub: "塑鋼加壓機",     icon: "booster", color: "#c0392b" },
  { key: "PW",  name: "PW 系列",  sub: "沉水泵",         icon: "sub",     color: "#16748f" }
];

// 進階版：8 對「名稱 ↔ 特點描述」配對
const MEM_PRO = [
  { key: "TQ",   name: "TQ 系列",   desc: "電子式加壓機，具電壓切換設計" },
  { key: "GQ",   name: "GQ 系列",   desc: "迴水噴射式設計，自行調節內外壓力差" },
  { key: "TP3",  name: "TP3 系列",  desc: "塑鋼抽水機，本體工程塑膠不生鏽" },
  { key: "TP8",  name: "TP8 系列",  desc: "塑鋼加壓機，內置逆止閥" },
  { key: "PW",   name: "PW 系列",   desc: "沉水泵，直接沒入水中抽排水" },
  { key: "SEAL", name: "機械軸封",  desc: "防止水沿轉軸滲入馬達線圈" },
  { key: "TANK", name: "壓力桶",    desc: "壓縮空氣緩衝壓力，減少頻繁啟動" },
  { key: "IMP",  name: "葉輪",      desc: "高速旋轉帶動水流的核心零件" }
];

/* 簡易 SVG 圖示（之後可用 assets/img/models/ 內的實品照替換） */
function memIcon(type, color) {
  const c = color || '#0e4c92';
  const svgs = {
    booster: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="45" width="52" height="34" rx="6" fill="${c}"/>
      <circle cx="44" cy="62" r="12" fill="#fff" opacity=".85"/>
      <circle cx="44" cy="62" r="5" fill="${c}"/>
      <rect x="70" y="52" width="16" height="8" fill="${c}"/>
      <rect x="30" y="20" width="12" height="25" fill="${c}"/>
      <ellipse cx="36" cy="20" rx="10" ry="6" fill="${c}" opacity=".7"/>
    </svg>`,
    intake: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="40" width="46" height="32" rx="6" fill="${c}"/>
      <circle cx="47" cy="56" r="11" fill="#fff" opacity=".85"/>
      <path d="M47 50 l4 6 h-8 z" fill="${c}"/>
      <rect x="8" y="60" width="16" height="8" fill="${c}"/>
      <rect x="70" y="46" width="8" height="16" fill="${c}"/>
      <path d="M74 42 q0 -14 -14 -16" stroke="${c}" stroke-width="6" fill="none"/>
    </svg>`,
    jet: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="44" width="48" height="30" rx="6" fill="${c}"/>
      <circle cx="44" cy="59" r="10" fill="#fff" opacity=".85"/>
      <path d="M44 52 a7 7 0 1 1 -7 7" stroke="${c}" stroke-width="3" fill="none"/>
      <rect x="68" y="50" width="16" height="7" fill="${c}"/>
      <path d="M84 53 l8 -5 v10 z" fill="${c}" opacity=".7"/>
    </svg>`,
    sub: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 30 q20 -10 40 0 t40 0 v8 q-20 10 -40 0 t-40 0 z" fill="${c}" opacity=".3"/>
      <rect x="36" y="42" width="28" height="40" rx="8" fill="${c}"/>
      <circle cx="50" cy="74" r="7" fill="#fff" opacity=".85"/>
      <rect x="46" y="28" width="8" height="14" fill="${c}"/>
    </svg>`,
    seal: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="55" r="26" fill="none" stroke="${c}" stroke-width="8"/>
      <circle cx="50" cy="55" r="10" fill="${c}"/>
      <rect x="46" y="14" width="8" height="20" fill="${c}"/>
    </svg>`,
    tank: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="30" rx="22" ry="10" fill="${c}"/>
      <rect x="28" y="30" width="44" height="42" fill="${c}"/>
      <ellipse cx="50" cy="72" rx="22" ry="10" fill="${c}"/>
      <ellipse cx="50" cy="30" rx="14" ry="6" fill="#fff" opacity=".4"/>
    </svg>`
  };
  return svgs[type] || svgs.booster;
}
