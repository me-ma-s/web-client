const { pgInsert } = require('../../services/pg');

async function postChannel(req, res) {
  try {
    const { rows } = await pgInsert('channels', req.body);
    res.send(rows[0]);

  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { postChannel }
