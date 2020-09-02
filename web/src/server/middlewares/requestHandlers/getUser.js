const { client } = require('../../services/pg');


async function getUser(req, res) {
  try {
    const user_id = req.query.user_id;

    const { rows } = await client.query(`
      SELECT * FROM users WHERE id=${user_id}
    `);

    res.send(rows[0]);
    
  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { getUser };
