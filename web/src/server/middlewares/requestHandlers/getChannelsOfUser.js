const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getChannelsOfUser(req, res) {
  try {
    const user_id = req.query.user_id;

    const { rows } = await client.query(`    
      SELECT channels.*, max(messages.date_time) AS last_updated
      FROM user_in_channel uic 
        INNER JOIN channels ON (uic.channel_id = channels.id) 
        LEFT OUTER JOIN messages ON (messages.channel_id = channels.id)
      WHERE uic.user_id=${user_id}
      GROUP BY channels.id
      ORDER BY last_updated DESC
    `);

    res.send(rows);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { getChannelsOfUser };
