const {resolve} = require('path');

module.exports = function setup(app) {

  app.post('/api/getNorms', async (req, res) => {
    const getNorms = require('./requests/getNorms');
    const data = await getNorms(req, res);
    res.send(data);
  });

  app.post('/api/getDocs', async (req, res) => {
    const getDocs = require('./requests/getDocs');
    const data = await getDocs(req, res);
    res.send(data);
  });

  app.get('/api/getPeriods', async (req, res) => {
    const getPeriods = require('./requests/getPeriods');
    const periods = await getPeriods(req, res);
    res.send(periods);
  });

  app.get('/api/getPeriodsDocs', async (req, res) => {
    const getPeriodsDocs = require('./requests/getPeriodsDocs');
    const periods = await getPeriodsDocs(req, res);
    res.send(periods);
  });

  app.get('/api/getUpdateDate', async (req, res) => {
    const getUpdateDate = require('./requests/getUpdateDate');
    const updateDate = await getUpdateDate(req, res);
    res.send(updateDate);
  });

  app.post('/api/getReport', async (req, res) => {
    const getReport = require('./requests/getReport');
    await getReport(req, res);
  });

  app.get('/api/getReports', async (req, res) => {
    const getReports = require('./requests/getReports');
    const reports = await getReports(req, res);
    res.send(reports);
  });

  app.get('/api/delReport', async (req, res) => {
    const delReport = require('./requests/delReport');
    const reports = await delReport(req, res);
    res.send(reports);
  });

  app.get('/api/downloadReport', async (req, res) => {
    const pathFile = resolve(__dirname, '..', '..', '..', (req.query.path));
    res.download(pathFile);
  });

  app.get('/api/getRating', async (req, res) => {
    const getRating = require('./requests/getRating');
    const rating = await getRating(req, res);
    res.send(rating);
  });

};
