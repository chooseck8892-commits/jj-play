/* ===== JJ-Play 全站設定（部署時只需改這個檔） ===== */
const JJ_CONFIG = {
  // GAS Web App 部署網址（部署後貼上，留空則僅記錄於 console 不上報）
  GAS_URL: '',

  // 有效入場令牌（每月/每檔期可更換，放在三通路的自動回覆訊息連結中）
  VALID_TOKENS: ['jj2607'],

  // 三通路連結（請換成正久實際連結）
  LINE_URL: 'https://line.me/R/ti/p/@your_line_id',
  FB_URL: 'https://www.facebook.com/your_fb_page',
  IG_URL: 'https://www.instagram.com/your_ig_account',

  // 結算頁 CTA（預設導向 LINE 官方帳號）
  CTA_URL: 'https://line.me/R/ti/p/@your_line_id',

  // 開發測試模式：true 時免令牌可直接進入（上線前改 false）
  DEV_MODE: true
};
