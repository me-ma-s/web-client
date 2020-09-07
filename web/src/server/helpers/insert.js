const { addQuotes } = require('./addQuotes');

const insert = (tableName, obj) => {
  let columns = { names: [], values: [] };
  Object.entries(obj).forEach(([key, val]) => {
    columns.names.push(key);
    columns.values.push(val);
  });
  columns.names = columns.names.join(', ');
  columns.values = columns.values.map(addQuotes).join(', ');
  
  return `
    INSERT INTO ${tableName} (${columns.names})
    VALUES (${columns.values})
    RETURNING *
  `;
}

module.exports = insert;
