/* G2 拆解重組｜三種機台模板（每局隨機）
   RIGS: id / name / quote / base(機台底圖SVG) / parts[]（zone 座標對應 viewBox 0 0 800 520） */

/* --- 共用零件圖 --- */
const P_SVG = {
  impeller: `<circle cx="50" cy="50" r="40" fill="#1d3a4d" stroke="#00c8ff" stroke-width="3"/>
    <g fill="#00c8ff"><path d="M50 50 L50 14 A36 36 0 0 1 76 26 Z"/><path d="M50 50 L86 50 A36 36 0 0 1 74 76 Z"/>
    <path d="M50 50 L50 86 A36 36 0 0 1 24 74 Z"/><path d="M50 50 L14 50 A36 36 0 0 1 26 24 Z"/></g>
    <circle cx="50" cy="50" r="9" fill="#ffd54a"/>`,
  seal: `<circle cx="50" cy="50" r="36" fill="none" stroke="#c0c8d0" stroke-width="14"/>
    <circle cx="50" cy="50" r="36" fill="none" stroke="#4a5a68" stroke-width="4"/>
    <circle cx="50" cy="50" r="14" fill="#2a3540"/>`,
  motor: `<rect x="12" y="30" width="76" height="44" rx="8" fill="#33424e" stroke="#00c8ff" stroke-width="2"/>
    <g stroke="#00c8ff" stroke-width="3"><line x1="22" y1="30" x2="22" y2="74"/><line x1="34" y1="30" x2="34" y2="74"/>
    <line x1="46" y1="30" x2="46" y2="74"/><line x1="58" y1="30" x2="58" y2="74"/><line x1="70" y1="30" x2="70" y2="74"/></g>
    <rect x="88" y="44" width="10" height="16" fill="#8fa3b0"/>`,
  cap: `<rect x="25" y="20" width="50" height="62" rx="22" fill="#2a3540" stroke="#ffd54a" stroke-width="3"/>
    <line x1="42" y1="10" x2="42" y2="20" stroke="#ffd54a" stroke-width="4"/>
    <line x1="58" y1="10" x2="58" y2="20" stroke="#ffd54a" stroke-width="4"/>
    <text x="50" y="58" fill="#ffd54a" font-size="16" text-anchor="middle" font-weight="900">μF</text>`,
  check: `<path d="M15 30 L48 50 L15 70 Z" fill="#00c8ff"/>
    <path d="M85 30 L52 50 L85 70 Z" fill="#33424e" stroke="#00c8ff" stroke-width="2"/>
    <line x1="50" y1="22" x2="50" y2="78" stroke="#ffd54a" stroke-width="5"/>`,
  tank: `<ellipse cx="50" cy="50" rx="42" ry="46" fill="#f2f2f2" stroke="#8fa3b0" stroke-width="4"/>
    <ellipse cx="50" cy="30" rx="26" ry="10" fill="#fff" opacity=".7"/>
    <rect x="44" y="90" width="12" height="8" fill="#8fa3b0"/>`,
  pswitch: `<rect x="22" y="30" width="56" height="46" rx="6" fill="#33424e" stroke="#c0c8d0" stroke-width="3"/>
    <circle cx="50" cy="53" r="14" fill="#1d2a34" stroke="#ffd54a" stroke-width="2"/>
    <line x1="50" y1="53" x2="58" y2="43" stroke="#ffd54a" stroke-width="3"/>
    <rect x="42" y="18" width="16" height="12" fill="#8fa3b0"/>`,
  cable: `<rect x="34" y="14" width="32" height="30" rx="8" fill="#33424e" stroke="#ffd54a" stroke-width="3"/>
    <path d="M50 44 C 50 62, 30 62, 30 82" stroke="#222" stroke-width="10" fill="none"/>
    <path d="M50 44 C 50 62, 30 62, 30 82" stroke="#ff7a1a" stroke-width="5" fill="none"/>`,
  stack: `<g stroke="#00c8ff" stroke-width="3" fill="#1d3a4d">
    <ellipse cx="50" cy="26" rx="30" ry="11"/><ellipse cx="50" cy="48" rx="30" ry="11"/><ellipse cx="50" cy="70" rx="30" ry="11"/></g>
    <line x1="50" y1="14" x2="50" y2="84" stroke="#ffd54a" stroke-width="5"/>`,
  strainer: `<path d="M25 20 L75 20 L68 80 L32 80 Z" fill="#33424e" stroke="#c0c8d0" stroke-width="3"/>
    <g stroke="#00c8ff" stroke-width="3"><line x1="34" y1="32" x2="66" y2="32"/><line x1="35" y1="46" x2="65" y2="46"/>
    <line x1="36" y1="60" x2="64" y2="60"/><line x1="38" y1="72" x2="62" y2="72"/></g>`,
  float: `<ellipse cx="50" cy="62" rx="26" ry="20" fill="#ff7a1a" stroke="#c0c8d0" stroke-width="3"/>
    <path d="M50 42 C 50 26, 66 26, 66 12" stroke="#222" stroke-width="6" fill="none"/>`,
  blades: `<g fill="#4dd0e1" stroke="#00838f" stroke-width="2">
    <path d="M50 50 C 30 20, 55 8, 68 22 C 74 32, 60 44, 50 50Z"/>
    <path d="M50 50 C 80 45, 86 72, 68 80 C 57 83, 50 62, 50 50Z"/>
    <path d="M50 50 C 32 72, 12 62, 16 44 C 20 33, 42 42, 50 50Z"/></g>
    <circle cx="50" cy="50" r="10" fill="#ffd54a" stroke="#8a6d00" stroke-width="2"/>`,
  bearing: `<circle cx="50" cy="50" r="34" fill="none" stroke="#c0c8d0" stroke-width="10"/>
    <g fill="#4a5a68"><circle cx="50" cy="18" r="6"/><circle cx="76" cy="30" r="6"/><circle cx="84" cy="56" r="6"/>
    <circle cx="68" cy="78" r="6"/><circle cx="34" cy="80" r="6"/><circle cx="18" cy="60" r="6"/>
    <circle cx="22" cy="32" r="6"/></g><circle cx="50" cy="50" r="12" fill="#2a3540"/>`,
  base: `<path d="M20 70 L80 70 L92 88 L8 88 Z" fill="#33424e" stroke="#c0c8d0" stroke-width="3"/>
    <rect x="44" y="26" width="12" height="46" fill="#4a5a68"/>
    <circle cx="22" cy="82" r="4" fill="#ffd54a"/><circle cx="78" cy="82" r="4" fill="#ffd54a"/>`,
  knob: `<rect x="24" y="26" width="52" height="52" rx="10" fill="#33424e" stroke="#c0c8d0" stroke-width="3"/>
    <circle cx="40" cy="46" r="8" fill="#ffd54a"/><circle cx="62" cy="46" r="8" fill="#4dd0e1"/>
    <rect x="34" y="62" width="32" height="8" rx="4" fill="#8fa3b0"/>`
};

const RIGS = [
  /* ===== 模板 1：家用加壓機 ===== */
  {
    id: "booster", name: "家用加壓機", quote: "「家家戶戶的水壓，就靠這台。」",
    base: `
      <rect x="50" y="440" width="620" height="26" rx="6" fill="#22303c" stroke="#45596b"/>
      <rect x="120" y="410" width="30" height="34" fill="#2a3844"/>
      <rect x="520" y="410" width="30" height="34" fill="#2a3844"/>
      <circle cx="170" cy="330" r="98" fill="#1a2733" stroke="#5a7183" stroke-width="5"/>
      <path d="M170 232 L170 95 L740 95" fill="none" stroke="#5a7183" stroke-width="18" stroke-linejoin="round"/>
      <path d="M740 80 L740 110" stroke="#5a7183" stroke-width="8"/>
      <path d="M72 330 L20 330" stroke="#5a7183" stroke-width="18"/>
      <rect x="255" y="318" width="90" height="18" fill="#42525f"/>
      <rect x="322" y="238" width="292" height="182" rx="16" fill="#141e27" stroke="#5a7183" stroke-width="5"/>
      <rect x="614" y="290" width="26" height="70" rx="8" fill="#22303c" stroke="#45596b"/>`,
    parts: [
      { id: "tank", name: "壓力桶", level: "basic", zone: { x: 85, y: 40, w: 170, h: 150 },
        note: "儲存壓縮空氣緩衝壓力，馬達不用一直起動。", svg: P_SVG.tank },
      { id: "impeller", name: "葉輪", level: "basic", zone: { x: 105, y: 265, w: 130, h: 130 },
        note: "泵浦的心臟！高速旋轉把能量甩給水流。", svg: P_SVG.impeller },
      { id: "seal", name: "機械軸封", level: "basic", zone: { x: 255, y: 300, w: 60, h: 60 },
        note: "擋住水不讓它進線圈。空轉最先燒的就是它！", svg: P_SVG.seal },
      { id: "motor", name: "馬達（定子+轉子）", level: "basic", zone: { x: 330, y: 250, w: 270, h: 160 },
        note: "定子磁場拖著轉子跑——感應馬達的看家本領。", svg: P_SVG.motor },
      { id: "cap", name: "啟動電容", level: "basic", zone: { x: 430, y: 185, w: 80, h: 55 },
        note: "單相馬達起跑的推手。換它之前先斷電放電！", svg: P_SVG.cap },
      { id: "check", name: "逆止閥", level: "pro", zone: { x: 300, y: 65, w: 80, h: 60 },
        note: "水只准去不准回，壓力回衝就靠它擋。", svg: P_SVG.check },
      { id: "pswitch", name: "壓力開關", level: "pro", zone: { x: 420, y: 65, w: 70, h: 60 },
        note: "壓力到頂自動停、掉底自動開——泵浦的自動駕駛。", svg: P_SVG.pswitch }
    ]
  },
  /* ===== 模板 2：深井沉水泵 ===== */
  {
    id: "submersible", name: "深井沉水泵", quote: "「井底的功夫，看不見才更要紮實。」",
    base: `
      <rect x="240" y="30" width="18" height="450" fill="#3b3227"/>
      <rect x="542" y="30" width="18" height="450" fill="#3b3227"/>
      <path d="M258 120 Q 300 108 340 120 T 420 120 T 500 120 T 542 120" stroke="#3aa0c9" stroke-width="5" fill="none" opacity=".8"/>
      <rect x="258" y="122" width="284" height="358" fill="#173042" opacity=".55"/>
      <rect x="330" y="55" width="140" height="410" rx="14" fill="none" stroke="#5a7183" stroke-width="5"/>
      <path d="M400 55 L400 30 L700 30 L700 60" fill="none" stroke="#5a7183" stroke-width="14"/>
      <text x="640" y="90" fill="#6d8496" font-size="14" text-anchor="middle">出水管</text>`,
    parts: [
      { id: "cable", name: "防水電纜頭", level: "pro", zone: { x: 350, y: 58, w: 100, h: 58 },
        note: "電進得去、水進不來。井下供電的生命線。", svg: P_SVG.cable },
      { id: "motor", name: "密封馬達", level: "basic", zone: { x: 338, y: 120, w: 124, h: 112 },
        note: "整顆泡在水裡跑，密封等級是它的命。", svg: P_SVG.motor },
      { id: "seal", name: "機械軸封", level: "basic", zone: { x: 352, y: 236, w: 96, h: 52 },
        note: "馬達與水室的最後防線，漏了就進水燒毀。", svg: P_SVG.seal },
      { id: "stack", name: "多段葉輪組", level: "basic", zone: { x: 338, y: 292, w: 124, h: 92 },
        note: "一段一段串起來，把深井水一路推上樓——揚程疊加的秘密。", svg: P_SVG.stack },
      { id: "strainer", name: "吸入濾網", level: "basic", zone: { x: 338, y: 388, w: 124, h: 70 },
        note: "泥沙擋在門外，葉輪才活得久。", svg: P_SVG.strainer },
      { id: "check", name: "逆止閥", level: "basic", zone: { x: 480, y: 8, w: 84, h: 58 },
        note: "停機時擋住整管水柱倒灌，保護泵體。", svg: P_SVG.check },
      { id: "float", name: "浮球開關", level: "pro", zone: { x: 190, y: 150, w: 100, h: 90 },
        note: "水位太低自動斷電，防空轉的哨兵。", svg: P_SVG.float }
    ]
  },
  /* ===== 模板 3：工業立扇 ===== */
  {
    id: "fan", name: "工業立扇", quote: "「廠房裡的風，也是要人養的。」",
    base: `
      <circle cx="230" cy="210" r="150" fill="#141e27" stroke="#5a7183" stroke-width="5"/>
      <g stroke="#3d5568" stroke-width="3">
        <circle cx="230" cy="210" r="120" fill="none"/><circle cx="230" cy="210" r="80" fill="none"/>
        <line x1="230" y1="62" x2="230" y2="358"/><line x1="82" y1="210" x2="378" y2="210"/>
        <line x1="126" y1="106" x2="334" y2="314"/><line x1="334" y1="106" x2="126" y2="314"/></g>
      <rect x="380" y="160" width="200" height="110" rx="18" fill="#141e27" stroke="#5a7183" stroke-width="5"/>
      <rect x="580" y="185" width="40" height="60" rx="8" fill="#22303c" stroke="#45596b"/>
      <rect x="470" y="270" width="24" height="150" fill="#2a3844"/>
      <text x="230" y="500" fill="#6d8496" font-size="14" text-anchor="middle">護網（已裝好）</text>`,
    parts: [
      { id: "blades", name: "扇葉", level: "basic", zone: { x: 130, y: 110, w: 200, h: 200 },
        note: "積塵會失去平衡，越轉越吵——定期清潔是保養第一課。", svg: P_SVG.blades },
      { id: "bearing", name: "軸承", level: "pro", zone: { x: 335, y: 180, w: 70, h: 70 },
        note: "支撐轉軸減少摩擦。缺油卡滯，轉速就掉。", svg: P_SVG.bearing },
      { id: "motor", name: "風扇馬達", level: "basic", zone: { x: 405, y: 168, w: 150, h: 95 },
        note: "風量的來源。極數越多轉速越慢、越安靜。", svg: P_SVG.motor },
      { id: "cap", name: "啟動電容", level: "basic", zone: { x: 575, y: 178, w: 60, h: 75 },
        note: "風扇嗡嗡叫不轉？八成是它罷工了。", svg: P_SVG.cap },
      { id: "knob", name: "控制開關", level: "basic", zone: { x: 400, y: 285, w: 100, h: 90 },
        note: "段速與擺頭的指揮台，接點燒蝕會失靈。", svg: P_SVG.knob },
      { id: "base", name: "底座", level: "basic", zone: { x: 390, y: 390, w: 190, h: 100 },
        note: "站得穩才吹得遠，鬆動就會晃頭又異音。", svg: P_SVG.base }
    ]
  }
];
