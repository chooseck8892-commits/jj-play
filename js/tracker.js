/* ===== 事件上報（GAS + Google Sheets） ===== */
(function () {
  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  function getUid() {
    let uid = localStorage.getItem('jj_uid');
    if (!uid) { uid = uuid(); localStorage.setItem('jj_uid', uid); }
    return uid;
  }

  window.jjTrack = function (event, game, detail) {
    const payload = {
      uid: getUid(),
      event: event,
      game: game || '',
      detail: detail || {},
      src: localStorage.getItem('jj_src') || '',
      role: localStorage.getItem('jj_role') || '',
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      page: location.pathname.split('/').pop() || 'index.html'
    };
    if (!JJ_CONFIG.GAS_URL) { console.log('[jjTrack]', payload); return; }
    try {
      // GAS 不回 CORS header，使用 no-cors 單向送出；離開頁面時改用 sendBeacon
      const body = JSON.stringify(payload);
      if (event === 'page_leave' && navigator.sendBeacon) {
        navigator.sendBeacon(JJ_CONFIG.GAS_URL, body);
      } else {
        fetch(JJ_CONFIG.GAS_URL, { method: 'POST', mode: 'no-cors', body: body });
      }
    } catch (e) { /* 靜默失敗，不影響遊戲 */ }
  };

  // 自動記錄頁面瀏覽
  document.addEventListener('DOMContentLoaded', () => jjTrack('page_view'));
})();
