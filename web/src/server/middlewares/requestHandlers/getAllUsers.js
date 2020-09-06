const { client } = require('../../services/pg');


async function getAllUsers(req, res) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users ORDER BY users.id DESC
    `);

    res.send(rows);
    
  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { getAllUsers };
