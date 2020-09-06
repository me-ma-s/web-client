const { client } = require('../../services/pg');


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
    console.log(err.stack);
    res.send("Error: " + err.stack);
  }
}

module.exports = { getAllChannels };
