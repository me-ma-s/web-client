const { pgInsert } = require('../../services/pg');
const handleError = require('./handleError');

async function postUser(req, res) {
  try {
    const { rows } = await pgInsert('users', req.body);
    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { postUser }
