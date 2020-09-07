const { Pool } = require('pg');
const insert = require('../helpers/insert');

const client = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'messenger',
  user: 'postgres',
  password: 'postgres'
});

const pgInsert = (table, obj) => {
  return client.query(insert(table, obj));
}

module.exports = {
  client,
  pgInsert
};
