const { addQuotes } = require("../../helpers/addQuotes");
const { client } = require('../../services/pg');


async function postUserInChannel(req, res) {
  try {
    const channel_id = req.body.channel_id;
    const user_id = req.body.user_id;
    const preferences = addQuotes(req.body.preferences);
    const _enckey_user = addQuotes(req.body._enckey_user);
    const user_role = addQuotes(req.body.user_role);

    const { rows } = await client.query(`
      INSERT INTO user_in_channel (user_id, channel_id, preferences, _enckey_user, user_role)
      VALUES(${user_id}, ${channel_id}, ${preferences}, ${_enckey_user}, ${user_role}) 
      RETURNING *
    `);

    res.send(rows[0]);

  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { postUserInChannel };
