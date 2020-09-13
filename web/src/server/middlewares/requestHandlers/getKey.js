const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getKey(req, res) {
  try {
    const id = req.query.id;

    const { rows } = await client.query(`    
      SELECT * FROM keys WHERE id = ${id}
    `);

    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { getKey };
