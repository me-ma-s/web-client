const { client } = require('../../services/pg');


async function getMessages(req, res) {
  try {
    const channel_id = req.query.channel_id;

    const { rows } = await client.query(`
      SELECT * FROM messages WHERE channel_id=${channel_id}
      ORDER BY date_time DESC
    `);

    res.send(rows);
    
  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { getMessages };
