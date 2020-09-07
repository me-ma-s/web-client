const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getAllUsers(req, res) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users ORDER BY users.id DESC
    `);

    res.send(rows);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { getAllUsers };
