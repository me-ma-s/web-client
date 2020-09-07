const { pgInsert } = require('../../services/pg');

async function postUserInChannel(req, res) {
  try {
    const { rows } = await pgInsert('user_in_channel', req.body);
    res.send(rows[0]);

  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { postUserInChannel }
