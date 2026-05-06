// ===== Google Apps Script =====
// 기존 코드 전체 삭제 → 이 코드 붙여넣기
// 배포 > 배포 관리 > 연필 > 버전: 새 버전 > 배포
//
// 시트 구조: A열=시간, B열=데이터(JSON), C열=설명
// ===============================

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
      return page('저장 완료 ✓', memo || '저장되었습니다.', '#81C995');
    }

    // ── 버전 목록 (JSONP) ──
    if (action === 'list') {
      var lastRow = sheet.getLastRow();
      var versions = [];
      if (lastRow > 0) {
        var vals = sheet.getRange(1, 1, lastRow, 3).getValues();
        for (var i = 0; i < vals.length; i++) {
          versions.push({
            time: vals[i][0],
            memo: vals[i][2] || ''
          });
        }
      }
      if (callback) return jsonp(callback, {ok: true, versions: versions});
      return page('버전 ' + lastRow + '개', '', '#FFD666');
    }

    // ── 특정 버전 로드 (JSONP) ──
    if (action === 'load') {
      var row = parseInt(e.parameter.row);
      var val = sheet.getRange(row, 2).getValue();
      if (callback) return jsonp(callback, {ok: true, state: val});
      return page('v' + row, '', '#FFD666');
    }

    return page('MyPeb 체크리스트', '연동 정상', '#FFD666');

  } catch (err) {
    if (callback) return jsonp(callback, {ok: false, error: err.message});
    return page('오류', err.message, '#F28B82');
  }
}

function jsonp(callback, data) {
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(data) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function page(title, msg, color) {
  return HtmlService.createHtmlOutput(
    '<html><head><meta charset="utf-8"></head><body style="display:flex;align-items:center;justify-content:center;height:80vh;font-family:sans-serif">' +
    '<div style="text-align:center"><div style="font-size:28px;color:' + color + ';margin-bottom:8px">' + title + '</div>' +
    '<div style="color:#8A7E6B;font-size:14px">' + msg + '</div></div></body></html>'
  ).setTitle(title);
}
