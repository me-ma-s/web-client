const { client } = require('../services/pg'); // object of type Pool from require('pg')
const { addQuotes } = require('../helpers/addQuotes');
const putQueryTime = require('response-time');

// const IS_PROD = true;
const IS_PROD = process.env.NODE_ENV === 'production';
const IS_DEV = process.env.NODE_ENV === 'development';

module.exports.logger = putQueryTime(log);

function log(req, res, queryTime) {
  if (IS_DEV) { logToConsole(req); }
  // if (IS_PROD) { logToPostgres(req, queryTime); }
}

function logToConsole(req) {
  const logDate = new Date();

  const year = logDate.getFullYear()
  const month = ('0' + (logDate.getMonth() + 1)).slice(-2);
  const day = ('0' + (logDate.getDay() + 1)).slice(-2);
  const hours = ('0' + logDate.getHours()).slice(-2);
  const minutes = ('0' + logDate.getMinutes()).slice(-2);
  const seconds = ('0' + logDate.getSeconds()).slice(-2);

  let info = {};
  info.date = year + '.' + month + '.' + day;
  info.time = hours + ':' + minutes + ':' + seconds;
  info.method = req.method;
  info.params = req.params;
  info.body = req.body;
  info.url = req.protocol + '://' + req.headers.host + req.originalUrl;

  console.log(info);
}

async function logToPostgres(req, queryTime) {
  const logDate = new Date();

  const login = addQuotes("unknown");
  const created_at = addQuotes(logDate);
  const month = (100 * logDate.getUTCFullYear()) + logDate.getUTCMonth() + 1;
  const service = addQuotes(process.env.npm_package_name);
  const query = addQuotes(req.originalUrl);
  const params = addQuotes(JSON.stringify(req.params));
  const query_time = queryTime; //
  const ip = addQuotes(req.ip);
  const url = addQuotes(req.protocol + "://" + req.headers.host + req.originalUrl);
  const domain = addQuotes(req.headers.host);

  try {
    await client.query(`
            INSERT INTO logs (id, login, created_at, month, service, query, params, query_time, ip, url, domain)
                VALUES (DEFAULT, ${login}, ${created_at}, ${month}, ${service}, ${query}, ${params}, ${query_time}, ${ip}, ${url}, ${domain})
        `);
  } catch (err) {
    console.log(err.stack);
  }
}
