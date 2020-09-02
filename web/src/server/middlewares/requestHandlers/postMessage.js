const { client } = require('../../services/pg');
const { addQuotes } = require('../../helpers/addQuotes');


async function postMessage(req, res) {
  try {
    const channel_id = req.body.channel_id;
    const answer_to_id = req.body.answer_to_id || null;
    const user_id = req.body.user_id;
    const _text = addQuotes(req.body._text);

    const { rows } = await client.query(`
      INSERT INTO messages(id, channel_id, answer_to_id, user_id, date_time, _text)
      VALUES(DEFAULT, ${channel_id}, ${answer_to_id}, ${user_id}, DEFAULT, ${_text})
      RETURNING *
    `);

    res.send(rows);

  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { postMessage };
