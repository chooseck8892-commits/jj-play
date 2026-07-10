/* ===== 入口驗證：三通路令牌 ===== */
const JJ_AUTH = {
  // 解析 ?src=line&t=令牌；驗證成功寫入 localStorage
  check() {
    const p = new URLSearchParams(location.search);
    const src = p.get('src');
    const token = p.get('t');
    if (token && JJ_CONFIG.VALID_TOKENS.includes(token)) {
      localStorage.setItem('jj_auth', token);
      if (src) localStorage.setItem('jj_src', src);
      return true;
    }
    if (JJ_CONFIG.DEV_MODE) {
      localStorage.setItem('jj_auth', 'dev');
      localStorage.setItem('jj_src', src || 'dev');
      return true;
    }
    return JJ_CONFIG.VALID_TOKENS.includes(localStorage.getItem('jj_auth'));
  },
  // 內頁守門：未驗證導回入口
  guard() {
    const ok = JJ_CONFIG.DEV_MODE ||
      JJ_CONFIG.VALID_TOKENS.includes(localStorage.getItem('jj_auth')) ||
      localStorage.getItem('jj_auth') === 'dev';
    if (!ok) location.href = (location.pathname.includes('/games/') ? '../' : '') + 'index.html';
    return ok;
  },
  role() { return localStorage.getItem('jj_role') || ''; },
  setRole(r) {
    localStorage.setItem('jj_role', r);
    jjTrack('set_role', '', { role: r });
  }
};
