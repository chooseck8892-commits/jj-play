# 正久電機 互動學習樂園（JJ-Play）第一期 MVP

寓教於樂的泵浦/馬達/風機知識遊戲網站。純靜態架構，部署於 GitHub Pages，後台紀錄採 Google Apps Script + Google Sheets。

## 目前內容（第一期）

| 模組 | 狀態 | 說明 |
|---|---|---|
| 入口驗證 + 身分選擇 | ✅ | 三通路（LINE/FB/IG）令牌連結 + 家庭版/技師版 |
| 遊戲大廳 + 認識正久 | ✅ | `home.html` |
| G1 知識快問快答 | ✅ | 家庭版/技師版各 36 題（來源：正久200問、丙級16500題庫） |
| G3 機型記憶翻牌 | ✅ | 基礎 6 對同圖配對；進階 8 對「名稱↔特點」配對 |
| 後台紀錄 | ✅ | GAS + Sheets（users / events 兩表） |
| G2 零組件拼貼、G4 探索對戰 | 🔜 | 第二、三期 |

## 部署步驟

### A. 前端（GitHub Pages）

1. 在 GitHub 建立 repo（例：`jj-play`），把本資料夾全部內容 push 上去。
2. Repo → Settings → Pages → Source 選 `main` branch 根目錄 → Save。
3. 網址為 `https://<帳號>.github.io/jj-play/`。

### B. 後台（GAS + Google Sheets）

1. 建立新的 Google Sheets，從網址複製 ID。
2. Sheets → 擴充功能 → Apps Script，貼上 `gas/Code.gs`，將 `SHEET_ID` 換成你的 ID。
3. 執行一次 `setup()` 完成授權與建表。
4. 部署 → 新增部署 → 類型「網頁應用程式」→ 執行身分「我」、存取權「任何人」→ 取得 Web App 網址。
5. 打開 `js/config.js`，把網址貼到 `GAS_URL`。

### C. 通路設定（js/config.js）

```js
VALID_TOKENS: ['jj2607'],   // 每檔期可更換令牌
LINE_URL / FB_URL / IG_URL  // 換成正久實際連結
CTA_URL                     // 結算頁導流按鈕（建議 LINE 官方帳號）
DEV_MODE: true              // ⚠️ 上線前務必改成 false
```

發給粉絲的入場連結格式（放在 LINE 自動回覆 / FB 置頂 / IG Bio）：

```
https://<帳號>.github.io/jj-play/?src=line&t=jj2607
https://<帳號>.github.io/jj-play/?src=fb&t=jj2607
https://<帳號>.github.io/jj-play/?src=ig&t=jj2607
```

`src` 會記錄進後台，作為各通路成效 KPI。

## 後台資料表

- **users**：uid、first_seen、last_seen、src（來源通路）、role、device
- **events**：ts、uid、src、role、device、page、event、game、detail(JSON)

事件類型：`page_view`、`set_role`、`channel_click`、`game_start`、`game_end`（含分數/星等/秒數）、`rating`（1-5 星）、`cta_click`。

儀表板：Looker Studio 直連此 Sheets 即可；或用 Power BI Desktop 取 Sheets 資料深入分析。

## 內容維護

- 題庫：直接編輯 `data/quiz_basic.js`、`data/quiz_pro.js`（欄位：question/options/answer/explain/category/source）。
- 機型卡牌：編輯 `data/models.js`。之後若取得原廠產品照授權，可將圖檔放入 `assets/img/models/` 並替換 `memIcon()` 為 `<img>`。

## 本機測試

直接用瀏覽器開啟 `index.html` 即可（DEV_MODE=true 免令牌）。GAS_URL 留空時事件只會印在 console，不會上報。
