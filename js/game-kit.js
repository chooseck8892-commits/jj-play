/* ===== JJ Game Kit：金句庫 / 音效 / 角色系統 / 共用 UI ===== */

/* ---------- 1. 金槍大叔金句庫（每次轉場隨機） ---------- */
const JJ_QUOTES = {
  gate: [
    '「少年欸，水電這條路，先蹲馬步再出手。」',
    '「工具會騙人，功夫不會。」',
    '「入行三十年，我只信兩件事：扭力，和誠意。」',
    '「門檻不高，撐得久的人不多。」'
  ],
  lobby: [
    '「家裡水壓穩，日子才會順。來，大叔教你幾手。」',
    '「別問值不值得，問你敢不敢下場。」',
    '「機器會老，功夫不會。」',
    '「今天流的汗，是明天喊價的底氣。」',
    '「泵浦跟人生一樣，堵住了就要找出口。」'
  ],
  lobbyPro: [
    '「師傅欸，別只會換零件，原理才是真本事。」',
    '「圖紙看三遍，扳手才落手。」',
    '「客人信你，是因為你比故障更懂機器。」',
    '「檢定考的是題目，現場考的是人品。」'
  ],
  quizStart: [
    '「答得快才是真功夫。手軟的別進來。」',
    '「十題，見真章。」',
    '「腦袋跟水管一樣，通了就快。」',
    '「別猜，用懂的答。」'
  ],
  memStart: [
    '「機台的臉，看過就要記住。」',
    '「記性是吃這行飯的本錢。」',
    '「翻兩張，配一對，跟找零件一樣，眼要利。」'
  ],
  partsStart: [
    '「裝得回去，才算拆得懂。」',
    '「零件不會騙人，位置錯了就是錯了。」',
    '「手要穩，心要定，圖要記。」'
  ],
  advStart: [
    '「鎮上六台設備暴走了。工具包背好，替大叔出趟外勤。」',
    '「故障不可怕，可怕的是亂修。」',
    '「出勤三原則：先斷電、再判斷、後動手。」'
  ],
  win: [
    '「後生可畏，大叔服你。這杯茶敬你！」',
    '「這身手，可以出來開業了。」',
    '「漂亮收工！記得洗手再吃飯。」'
  ],
  mid: [
    '「有兩下子，但江湖水深，再練！」',
    '「七分功力，還差三分火候。」',
    '「不錯了，但大叔年輕時比你快。」'
  ],
  lose: [
    '「輸不可恥，不學才可恥。」',
    '「今天跌的跤，是明天站的台。」',
    '「回去翻筆記，明天再來討教。」'
  ]
};
function JJ_QUOTE(cat) {
  const arr = JJ_QUOTES[cat] || JJ_QUOTES.lobby;
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------- 2. 音效（WebAudio 合成，免音檔） ---------- */
const SFX = (function () {
  let ac = null, muted = localStorage.getItem('jj_mute') === '1';
  function ctx() { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); return ac; }
  function tone(freq, dur, type, vol, when, slide) {
    if (muted) return;
    try {
      const a = ctx(), o = a.createOscillator(), g = a.createGain();
      const t = a.currentTime + (when || 0);
      o.type = type || 'square'; o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
      g.gain.setValueAtTime(vol || .12, t);
      g.gain.exponentialRampToValueAtTime(.001, t + dur);
      o.connect(g); g.connect(a.destination);
      o.start(t); o.stop(t + dur + .02);
    } catch (e) {}
  }
  return {
    click:  () => tone(600, .06, 'square', .08),
    step:   () => tone(220, .04, 'triangle', .05),
    flip:   () => tone(500, .08, 'triangle', .1, 0, 800),
    good:   () => { tone(660, .09, 'square', .1); tone(880, .12, 'square', .1, .09); },
    match:  () => { tone(523, .1, 'square', .1); tone(659, .1, 'square', .1, .08); tone(784, .16, 'square', .1, .16); },
    bad:    () => tone(180, .3, 'sawtooth', .12, 0, 90),
    combo:  () => { tone(440, .08, 'square', .12, 0, 880); tone(880, .18, 'square', .12, .08, 1760); },
    hit:    () => { tone(300, .12, 'sawtooth', .14, 0, 120); tone(90, .18, 'square', .12, .02); },
    hurt:   () => tone(140, .35, 'sawtooth', .14, 0, 60),
    heal:   () => { tone(523, .1, 'sine', .12); tone(784, .2, 'sine', .12, .1); },
    battle: () => { tone(196, .14, 'square', .13); tone(196, .14, 'square', .13, .16); tone(392, .3, 'square', .13, .32); },
    win:    () => { [523, 659, 784, 1046].forEach((f, i) => tone(f, .16, 'square', .12, i * .13)); },
    lose:   () => { [392, 330, 262, 196].forEach((f, i) => tone(f, .2, 'triangle', .12, i * .15)); },
    capture:() => { tone(784, .1, 'square', .12); tone(1046, .1, 'square', .12, .1); tone(1318, .28, 'square', .12, .2); }
  };
})();

/* ---------- 3. 角色系統 ---------- */
const JJ_PROFILE = {
  DEFAULT: { name: '見習技師', gender: 'n', stats: { agi: 2, pat: 3, int: 3, cha: 2 } },
  MAX_PTS: 10,
  get() {
    try { return JSON.parse(localStorage.getItem('jj_profile')) || null; } catch (e) { return null; }
  },
  getOrDefault() { return this.get() || JSON.parse(JSON.stringify(this.DEFAULT)); },
  save(p) { localStorage.setItem('jj_profile', JSON.stringify(p)); },
  /* 能力效果 */
  agiReduce(dmg) {           // 敏捷：受傷減免（每點 -6%，上限 60%）
    const a = this.getOrDefault().stats.agi;
    return Math.max(1, Math.round(dmg * (1 - Math.min(a * .06, .6))));
  },
  agiStepDiscount() {        // 敏捷：翻牌步數折抵
    return Math.floor(this.getOrDefault().stats.agi / 3);
  },
  rollRegret() {             // 耐心：本局是否獲得後悔藥（每點 8%）
    return Math.random() < this.getOrDefault().stats.pat * .08;
  },
  rollHint(nQuestions) {     // 智力：抽一題顯示提示（每點 9% 觸發，隨機落在某題）
    if (Math.random() < this.getOrDefault().stats.int * .09)
      return Math.floor(Math.random() * nQuestions);
    return -1;
  },
  rollCharm() {              // 顏值：結算後獲得重配能力值機會（每點 7%）
    return Math.random() < this.getOrDefault().stats.cha * .07;
  },
  outfit() {                 // 性別穿搭配色
    const g = this.getOrDefault().gender;
    return g === 'm' ? { hair: '#2b2119', shirt: '#1565c0', pants: '#26343f', skin: '#ffcf9f' }
         : g === 'f' ? { hair: '#5c3317', shirt: '#d81b60', pants: '#37474f', skin: '#ffd9b3', pony: true }
         : { hair: '#3e4a3d', shirt: '#2e7d32', pants: '#3e2723', skin: '#ffcf9f' };
  }
};

/* 雷達圖（4 軸） */
function drawRadar(canvas, stats) {
  const c = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 34;
  const axes = [
    { k: 'agi', label: '敏捷' }, { k: 'pat', label: '耐心' },
    { k: 'int', label: '智力' }, { k: 'cha', label: '顏值' }
  ];
  const acc = getComputedStyle(document.documentElement).getPropertyValue('--acc').trim() || '#00c8ff';
  c.clearRect(0, 0, W, H);
  // 網格
  for (let ring = 1; ring <= 5; ring++) {
    c.beginPath();
    axes.forEach((a, i) => {
      const ang = -Math.PI / 2 + i * Math.PI / 2;
      const r = R * ring / 5;
      const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
      i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
    });
    c.closePath();
    c.strokeStyle = 'rgba(255,255,255,.14)'; c.stroke();
  }
  // 數值面
  c.beginPath();
  axes.forEach((a, i) => {
    const ang = -Math.PI / 2 + i * Math.PI / 2;
    const r = R * (stats[a.k] || 0) / 10;
    const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
    i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
  });
  c.closePath();
  c.fillStyle = acc + '55'; c.fill();
  c.strokeStyle = acc; c.lineWidth = 2.5; c.stroke();
  // 標籤
  c.font = '900 15px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  axes.forEach((a, i) => {
    const ang = -Math.PI / 2 + i * Math.PI / 2;
    const x = cx + Math.cos(ang) * (R + 20), y = cy + Math.sin(ang) * (R + 20);
    c.fillStyle = '#fff';
    c.fillText(a.label + ' ' + (stats[a.k] || 0), x, y);
  });
}

/* ---------- 4. 共用 UI ---------- */
const JJ_UI = {
  /* 確認視窗（重置用） */
  confirm(msg, onYes) {
    const el = document.createElement('div');
    el.className = 'jj-modal';
    el.innerHTML = `<div class="jj-modal-panel">
      <p class="jj-modal-msg">${msg}</p>
      <div class="jj-modal-btns">
        <button class="btn ghost" data-a="no">取消</button>
        <button class="btn" data-a="yes">確認重置</button>
      </div></div>`;
    document.body.appendChild(el);
    el.addEventListener('click', e => {
      const a = e.target.dataset && e.target.dataset.a;
      if (a === 'yes') { SFX.click(); onYes && onYes(); el.remove(); }
      else if (a === 'no' || e.target === el) { SFX.click(); el.remove(); }
    });
  },
  toast(msg, ms) {
    const el = document.createElement('div');
    el.className = 'jj-toast';
    el.innerHTML = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms || 2600);
  },
  /* 來源 logo 浮水印：優先載入正式 logo 圖檔，失敗改用 SVG 重繪版 */
  stampLogo(rel) {
    rel = rel || '';
    const box = document.createElement('a');
    box.className = 'src-logo';
    box.href = 'https://www.google.com/search?q=正久電機廠';
    box.target = '_blank'; box.rel = 'noopener';
    box.title = '正久電機廠 MASAHISA';
    const img = document.createElement('img');
    img.src = rel + 'assets/img/logo.png';
    img.alt = '正久 MASAHISA';
    img.onerror = () => { box.innerHTML = JJ_UI._logoSVG(); };
    box.appendChild(img);
    document.body.appendChild(box);
  },
  _logoSVG() {
    return `<svg viewBox="0 0 300 64" xmlns="http://www.w3.org/2000/svg">
      <polygon points="8,20 30,6 58,10 62,44 40,58 12,52" fill="none" stroke="#9e1b32" stroke-width="7" stroke-linejoin="round"/>
      <text x="35" y="42" font-size="30" font-weight="900" fill="#9e1b32" text-anchor="middle" font-family="serif">正久</text>
      <text x="78" y="30" font-size="26" font-weight="900" fill="#9e1b32" font-style="italic" font-family="sans-serif" letter-spacing="1">MASAHISA</text>
      <text x="79" y="54" font-size="17" fill="#4a3a33" font-family="sans-serif" letter-spacing="4">馬達專業製造廠</text>
    </svg>`;
  },
  /* 顏值觸發：重配能力值 */
  offerCharmReset(rel) {
    if (!JJ_PROFILE.rollCharm()) return;
    const el = document.createElement('div');
    el.className = 'jj-toast charm';
    el.innerHTML = `✨「這面相不錯，大叔看你順眼！」<br>獲得一次<b>重配能力值</b>的機會
      <div style="margin-top:8px"><button class="btn" style="padding:8px 18px;font-size:.85rem" id="charmGo">前往重配</button></div>`;
    document.body.appendChild(el);
    el.querySelector('#charmGo').addEventListener('click', () => {
      location.href = (rel || '') + 'index.html#profile';
    });
    setTimeout(() => el.remove(), 7000);
  }
};

/* 最佳紀錄 */
const JJ_BEST = {
  get(k) { try { return JSON.parse(localStorage.getItem('jj_best') || '{}')[k]; } catch (e) { return undefined; } },
  set(k, v) {
    const b = JSON.parse(localStorage.getItem('jj_best') || '{}');
    b[k] = v; localStorage.setItem('jj_best', JSON.stringify(b));
  },
  clear(k) {
    const b = JSON.parse(localStorage.getItem('jj_best') || '{}');
    delete b[k]; localStorage.setItem('jj_best', JSON.stringify(b));
  }
};
