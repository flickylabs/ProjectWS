// ===== Google Apps Script — 솔로몬 리소스 체크리스트 =====
//
// 사용법:
// 1. Google Sheets 새 스프레드시트 생성
// 2. 확장 프로그램 > Apps Script 열기
// 3. 기존 코드 전체 삭제 → 이 코드 붙여넣기
// 4. 배포 > 새 배포 > 유형: 웹 앱 > 액세스: 모든 사용자 > 배포
// 5. 생성된 URL을 checklist.html의 GS_URL 입력란에 붙여넣기
//
// 시트 구조: A열=시간, B열=데이터(JSON), C열=설명
// =========================================================

function doGet(e) {
  var action = e.parameter.action || '';
  var callback = e.parameter.callback || '';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  try {

    // ── 저장 ──
    if (action === 'save') {
      var data = e.parameter.data || '{}';
      var memo = e.parameter.memo || '';
      sheet.appendRow([new Date().toISOString(), data, memo]);

      if (callback) return jsonp(callback, {ok: true});
      return page('저장 완료 ✓', memo || '저장되었습니다.', '#d97706');
    }

    // ── 최신 로드 (JSONP) ──
    if (action === 'latest') {
      var lastRow = sheet.getLastRow();
      if (lastRow > 0) {
        var val = sheet.getRange(lastRow, 2).getValue();
        var time = sheet.getRange(lastRow, 1).getValue();
        if (callback) return jsonp(callback, {ok: true, state: val, time: time, row: lastRow});
      } else {
        if (callback) return jsonp(callback, {ok: true, state: null, row: 0});
      }
      return page('최신 데이터', '', '#d97706');
    }

    // ── 버전 목록 (JSONP) ──
    if (action === 'list') {
      var lastRow = sheet.getLastRow();
      var versions = [];
      if (lastRow > 0) {
        var vals = sheet.getRange(1, 1, lastRow, 3).getValues();
        for (var i = 0; i < vals.length; i++) {
          versions.push({
            row: i + 1,
            time: vals[i][0],
            memo: vals[i][2] || ''
          });
        }
      }
      if (callback) return jsonp(callback, {ok: true, versions: versions});
      return page('버전 ' + lastRow + '개', '', '#d97706');
    }

    // ── 특정 버전 로드 (JSONP) ──
    if (action === 'load') {
      var row = parseInt(e.parameter.row);
      var val = sheet.getRange(row, 2).getValue();
      if (callback) return jsonp(callback, {ok: true, state: val});
      return page('v' + row, '', '#d97706');
    }

    return page('솔로몬 체크리스트', '연동 정상', '#d97706');

  } catch (err) {
    if (callback) return jsonp(callback, {ok: false, error: err.message});
    return page('오류', err.message, '#f87171');
  }
}

function jsonp(callback, data) {
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(data) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function page(title, msg, color) {
  return HtmlService.createHtmlOutput(
    '<html><head><meta charset="utf-8"></head><body style="display:flex;align-items:center;justify-content:center;height:80vh;font-family:sans-serif;background:#0a0a0f;color:#e5e5e5">' +
    '<div style="text-align:center"><div style="font-size:28px;color:' + color + ';margin-bottom:8px">⚖️ ' + title + '</div>' +
    '<div style="color:#8a8a9a;font-size:14px">' + msg + '</div></div></body></html>'
  ).setTitle(title);
}
