const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getChannelsOfUser(req, res) {
  try {
    const user_id = req.query.user_id;

    const { rows } = await client.query(`    
      SELECT channels.*, keys.key AS channel_key, uic.preferences
      FROM channels
        INNER JOIN user_in_channel uic ON (uic.channel_id = channels.id)
        LEFT OUTER JOIN keys ON (channels.key_id = keys.id)
      WHERE uic.user_id=${user_id}
      ORDER BY id ASC
    `);

    res.send(rows);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = { getChannelsOfUser };
