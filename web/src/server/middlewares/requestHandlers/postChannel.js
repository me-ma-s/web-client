const { pgInsert } = require('../../services/pg');
const handleError = require('./handleError');

async function postChannel(req, res) {
  try {
    const { rows } = await pgInsert('channels', req.body);
    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { postChannel }
