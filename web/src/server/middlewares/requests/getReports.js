const getReports = async (req, res) => {
  const { queryPg } = require('./../../services/pg');
  let login = req.cookies.login || 'unknown';

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

module.exports = getReports;
