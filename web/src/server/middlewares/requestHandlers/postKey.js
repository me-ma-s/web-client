const { pgInsert } = require('../../services/pg');
const handleError = require('./handleError');

async function postKey(req, res) {
  try {
    const { rows } = await pgInsert('keys', req.body);
    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { postKey }
