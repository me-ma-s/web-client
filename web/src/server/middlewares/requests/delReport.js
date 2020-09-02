const delReport = async (req, res) => {
  const { queryPg } = require('./../../services/pg');
  let login = req.cookies.login || 'unknown';

  const delReportQuery = `
    DELETE
    FROM userdata.rdn_reports
    WHERE id = ${req.query.id}
  `
  await queryPg(res, delReportQuery);

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

  return reports;
}

module.exports = delReport;
