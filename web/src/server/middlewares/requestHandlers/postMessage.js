const { pgInsert } = require('../../services/pg');

async function postMessage(req, res) {
  try {
    const { rows } = await pgInsert('messages', req.body);
    res.send(rows[0]);

  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { postMessage }
