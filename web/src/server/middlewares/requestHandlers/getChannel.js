const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getChannel(req, res) {
  try {
    const channel_id = req.query.channel_id;

    const { rows } = await client.query(`
      SELECT * FROM channels WHERE id=${channel_id}
    `);

    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { getChannel };
