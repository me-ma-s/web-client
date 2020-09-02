const getPeriods = async (req, res) => {
  const { queryPg } = require('./../../services/pg');

  let updateDatesQuery = `
    SELECT obj_description('rating_prod.${req.query.type}_${req.query.period}_${req.query.profile}'::regclass) as description
  `;
  console.log(updateDatesQuery);
  
  let updateDate = await queryPg(res, updateDatesQuery);

  if (updateDate.length > 0) {
    return updateDate[0];
  } else {
    return 'Неизвестно'
  }

  
}

module.exports = getPeriods;
