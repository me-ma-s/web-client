const { pgInsert } = require('../../services/pg');
const handleError = require('./handleError');

async function postMessage(req, res) {
  try {
    const { rows } = await pgInsert('messages', req.body);
    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { postMessage }
