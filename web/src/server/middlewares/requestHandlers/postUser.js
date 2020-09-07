const { pgInsert } = require('../../services/pg');

async function postUser(req, res) {
  try {
    const { rows } = await pgInsert('users', req.body);
    res.send(rows[0]);

  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { postUser }
