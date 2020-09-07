const { Pool } = require('pg');
const { addQuotes } = require('../helpers/addQuotes');

const client = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'messenger',
  user: 'postgres',
  password: 'postgres'
});

function getColumns(obj) {
  let columns = { names: [], values: [] };
  Object.entries(obj).forEach(([key, val]) => {
    columns.names.push(key);
    columns.values.push(val);
  });
  columns.names = columns.names.join(', ');
  columns.values = columns.values.map(addQuotes).join(', ');

  return columns;
}

function pgInsert(table, obj) {
  const { names, values } = getColumns(obj)
  return client.query(`
    INSERT INTO ${table} (${names})
    VALUES(${values})
    RETURNING *
  `);
}

module.exports = {
  client,
  pgInsert
};
