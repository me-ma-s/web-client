const getPeriods = async (req, res) => {
  const { queryPg } = require('./../../services/pg');

  let periodsQuery = `
    SELECT DISTINCT substring(table_name from 6 for 6) partition_name 
    FROM   information_schema.tables
    WHERE table_schema = 'rating_prod' AND table_name like 'docs_%'
    ORDER BY partition_name DESC
  `;
  let periods = await queryPg(res, periodsQuery);
  let periodsList = [];
  periods.map((period) => {
    if (period.partition_name == 'actual') {
      periodsList.push({key: 'actual', name:'Текущий'});
    } else {
      periodsList.push({key: `${period.partition_name}_12`, name: `01.${period.partition_name.slice(4)}.${period.partition_name.slice(0,4)} 12 месяцев`});
      periodsList.push({key: `${period.partition_name}_3`, name: `01.${period.partition_name.slice(4)}.${period.partition_name.slice(0,4)} 3 месяца`});
    }
  });

  return periodsList;
}

module.exports = getPeriods;
