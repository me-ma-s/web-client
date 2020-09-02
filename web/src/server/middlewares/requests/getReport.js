const reportBuilder = require('./../../services/report-builder');
const moment = require('moment');

const getReport = async (req, res) => {
  const { queryPg } = require('./../../services/pg');

  let login = req.cookies.login || 'unknown';
  let data = [];
  let title = 'Рейтинг';
  let headers = [];
  let createdDate = moment();
  let parseDate = createdDate.format('DD-MM-YYYY_HH-mm-ss');
  let reportId;

  let {offset, count} = req.body;

  let getData;

  const newReportQuery = `
    INSERT INTO userdata.rdn_reports (path, login, date_time, is_ready, params)
    VALUES (
      'docs/reports/${login}/report_${parseDate}.xlsx',
      '${login}',
      '${createdDate.utc().format()}',
      false,
      '${JSON.stringify(req.body)}')
    RETURNING id
  `
  let id = await queryPg(res, newReportQuery);
  reportId = id[0].id;

  const getReportsQuery = `
    SELECT *
    FROM userdata.rdn_reports
    WHERE login = '${login}'
    ORDER BY date_time DESC
  `
  let reports = await queryPg(res, getReportsQuery);
  reports.map(report => {
    report.params = JSON.parse(report.params);
  })
  res.send(reports);
  try {
    if (req.body.type == 'norms') {
      getData = require('./getNorms');
      headers = [
        '№',
        'Статья',
        'База',
        'Первая редакция',
        'Нормативно-правовой акт'
      ];
    } else if (req.body.type == 'docs') {
      getData = require('./getDocs');
      headers = [
        '№',
        'База',
        'Первая редакция',
        'Нормативно-правовой акт'
      ];
    }

    if (req.body.isCompare) {
      headers.push(
        ['Рейтинг', 'Ранг', 'Ранг 2', 'Значение', 'Значение 2'],
        ['Востребованность', 'Ранг', 'Ранг 2', 'Значение', 'Значение 2'],
        ['Непонятность', 'Ранг', 'Ранг 2', 'Значение', 'Значение 2'],
        'Доля проблемности',
        'Доля проблемности 2'
      );
    } else {
      headers.push(
        ['Рейтинг', 'Ранг', 'Значение'],
        ['Востребованность', 'Ранг', 'Значение'],
        ['Непонятность', 'Ранг', 'Значение'],
        'Доля проблемности'
      );
    }

    let { wb, ws } = reportBuilder.createReport(title, headers);
    let num = 10000;
    while (offset < count) {
      num = ((offset + num) <= count) ? num : (count - offset);
      if (num == 0) break;
      req.body.offset = offset;
      req.body.count = num;
      data = await getData(req, res);    
      if (data.length == 0) break;
      wb = await reportBuilder.addData(wb, ws, getDataForTable(data, req.body.type, req.body.isCompare), {}, offset).wb;
      offset+=num;
    }
    reportBuilder.saveReport(login, parseDate, wb);

    const updateReportQuery = `
      UPDATE userdata.rdn_reports
      SET is_ready = true
      WHERE id = ${reportId}
    `
    await queryPg(res, updateReportQuery);

  } catch(err) {
    const errorReportQuery = `
      UPDATE userdata.rdn_reports
      SET is_error = true, is_ready = true
      WHERE id = ${reportId}
    `
    await queryPg(res, errorReportQuery);
  }

  return {status: 'OK'}
}

const getDataForTable = (data, type, isCompare) => {
  let resData = [];
  if (type == 'norms') {
    data.map((item) => {
      let rowData = [];
      rowData.push(
        item.rating_rank1,
        `[${item.label}] ${item.norm_title}`,
        item.base,
        item.fe,
        item.dod_title,
        item.rating_rank1,
      )
      if (isCompare) rowData.push(item.rating_rank2);
      rowData.push(item.rating1);
      if (isCompare) rowData.push(item.rating2);
      rowData.push(item.relevance_rank1);
      if (isCompare) rowData.push(item.relevance_rank2);
      rowData.push(item.relevance1);
      if (isCompare) rowData.push(item.relevance2);
      rowData.push(item.obscurity_rank1);
      if (isCompare) rowData.push(item.obscurity_rank2);
      rowData.push(item.obscurity1);
      if (isCompare) rowData.push(item.obscurity2);
      rowData.push(item.problem_share1);
      if (isCompare) rowData.push(item.problem_share2);
      resData.push(rowData);
    });
  } else if (type == 'docs') {
    data.map((item) => {
      let rowData = [];
      rowData.push(
        item.rating_rank1,
        item.base,
        item.fe,
        item.doc_title,
        item.rating_rank1,
      )
      if (isCompare) rowData.push(item.rating_rank2);
      rowData.push(item.rating1);
      if (isCompare) rowData.push(item.rating2);
      rowData.push(item.relevance_rank1);
      if (isCompare) rowData.push(item.relevance_rank2);
      rowData.push(item.relevance1);
      if (isCompare) rowData.push(item.relevance2);
      rowData.push(item.obscurity_rank1);
      if (isCompare) rowData.push(item.obscurity_rank2);
      rowData.push(item.obscurity1);
      if (isCompare) rowData.push(item.obscurity2);
      rowData.push(item.problem_share1);
      if (isCompare) rowData.push(item.problem_share2);
      resData.push(rowData);
    });
  }

  return resData;
}

module.exports = getReport;
