/**
 * 正久互動網站 後台 API（Google Apps Script）
 * 部署方式：
 * 1. 建立新的 Google Sheets，複製其網址中的 ID 貼到下方 SHEET_ID
 * 2. 擴充功能 → Apps Script → 貼上本檔 → 執行一次 setup()（授權）
 * 3. 部署 → 新增部署 → 網頁應用程式
 *    - 執行身分：我
 *    - 存取權：任何人
 * 4. 複製 Web App 網址，貼到前端 js/config.js 的 GAS_URL
 */

const SHEET_ID = '請貼上你的_GOOGLE_SHEETS_ID';

/** 初始化資料表（手動執行一次） */
function setup() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  ensureSheet_(ss, 'events', ['ts', 'uid', 'src', 'role', 'device', 'page', 'event', 'game', 'detail']);
  ensureSheet_(ss, 'users', ['uid', 'first_seen', 'last_seen', 'src', 'role', 'device']);
  Logger.log('資料表初始化完成');
}

function ensureSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  }
  return sh;
}

/** 接收前端事件 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(8000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);

    // 1. 寫入事件流水
    ensureSheet_(ss, 'events', ['ts','uid','src','role','device','page','event','game','detail'])
      .appendRow([new Date(), d.uid || '', d.src || '', d.role || '', d.device || '',
                  d.page || '', d.event || '', d.game || '', JSON.stringify(d.detail || {})]);

    // 2. 更新 users（upsert）
    const us = ensureSheet_(ss, 'users', ['uid','first_seen','last_seen','src','role','device']);
    const uids = us.getRange(2, 1, Math.max(us.getLastRow() - 1, 1), 1).getValues().flat();
    const rowIdx = uids.indexOf(d.uid);
    if (d.uid && rowIdx === -1) {
      us.appendRow([d.uid, new Date(), new Date(), d.src || '', d.role || '', d.device || '']);
    } else if (d.uid) {
      const r = rowIdx + 2;
      us.getRange(r, 3).setValue(new Date());          // last_seen
      if (d.role) us.getRange(r, 5).setValue(d.role);  // 身分可能切換
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** 簡易統計查詢：GET ?stats=1 回傳 KPI JSON（供儀表板或內部檢查） */
function doGet(e) {
  if (!e.parameter.stats) return json_({ ok: true, service: 'jj-play' });
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const ev = ss.getSheetByName('events');
  const us = ss.getSheetByName('users');
  const events = ev.getLastRow() - 1;
  const users = us.getLastRow() - 1;

  // 通路分布
  const srcCol = us.getLastRow() > 1 ? us.getRange(2, 4, us.getLastRow() - 1, 1).getValues().flat() : [];
  const bySrc = {};
  srcCol.forEach(s => { const k = s || 'unknown'; bySrc[k] = (bySrc[k] || 0) + 1; });

  return json_({ ok: true, total_users: users, total_events: events, by_src: bySrc });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
