const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getAllChannels(req, res) {
  try {
    const { rows } = await client.query(`
      SELECT channels.* FROM channels ORDER BY id ASC`);

    res.send(rows);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { getAllChannels };
