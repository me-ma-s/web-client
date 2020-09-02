const { addQuotes } = require("../../helpers/addQuotes");
const { client } = require('../../services/pg');


async function postChannel(req, res) {
  try {
    const name = addQuotes(req.body.name);
    const parent_id = req.body.parent_id || null;
    const _enckey_parent = addQuotes(req.body._enckey_parent);

    const { rows } = await client.query(`
      INSERT INTO channels (id, name, parent_id, _enckey_parent)
      VALUES(DEFAULT, ${name}, ${parent_id}, ${_enckey_parent})
      RETURNING *
    `);

    res.send(rows);

  } catch (err) {
    console.log(err.stack);
    res.send("Error");
  }
}

module.exports = { postChannel };
