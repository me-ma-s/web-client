const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getUser(req, res) {
  try {
    const user_id = req.query.user_id;

    const { rows } = await client.query(`
      SELECT * FROM users WHERE id=${user_id}
    `);

    res.send(rows[0]);
    
  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { getUser };
