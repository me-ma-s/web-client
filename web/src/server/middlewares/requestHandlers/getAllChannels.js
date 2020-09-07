const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getAllChannels(req, res) {
  try {
    const { rows } = await client.query(`
      SELECT channels.*, max(messages.date_time) AS last_updated
      FROM messages RIGHT OUTER JOIN channels ON (messages.channel_id = channels.id)
      GROUP BY channels.id
      ORDER BY last_updated DESC
    `);

    res.send(rows);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { getAllChannels };
