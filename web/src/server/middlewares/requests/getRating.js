const getRating = async (req, res) => {
  const { queryPg } = require('./../../services/pg');

  let { offset, count, period, profile, type } = req.query;

  let ratingQuery = '';

  if (type == 'norms') {
    ratingQuery = `
      SELECT case when norm_info.doc_title is null then 'Статья утратила силу' else norm_info.doc_title end doc_title,
        case when norm_info.title is null then 'Статья утратила силу' else norm_info.title end norm_title,
        case when norm_info.chapter is null then rating.link else norm_info.chapter end point_label,
        case when norm_info.base is null then '' else norm_info.base end base,
        case when norm_info.fe is null then 0 else norm_info.fe end fe,
        rating.rating_rank rating_rank,
        rating.rating rating, rating.relevance relevance, rating.relevance_rank relevance_rank,
        rating.obscurity obscurity, rating.obscurity_rank obscurity_rank, rating.problem_share problem_share
      FROM  rating_prod.norms_${period}_${profile} AS rating
      LEFT JOIN doc_part.norm_info ON rating.link_hash = norm_info.chapter_hash AND rating.doc_link_hash = norm_info.link_hash
      ORDER BY rating.rating_rank
      OFFSET ${offset} LIMIT ${count}
    `;
  } else if (type == 'docs') {
    ratingQuery = `
    SELECT case when doc_info.title is null then 'Статья утратила силу' else doc_info.title end doc_title,
      case when doc_info.base is null then '' else doc_info.base end base,
      case when doc_info.fe is null then 0 else doc_info.fe end fe,
      rating.rating_rank rating_rank,
      rating.rating rating, rating.relevance relevance, rating.relevance_rank relevance_rank,
      rating.obscurity obscurity, rating.obscurity_rank obscurity_rank, rating.problem_share problem_share
    FROM  rating_prod.docs_${period}_${profile} AS rating
    LEFT JOIN doc_part.doc_info AS doc_info ON rating.link_hash = doc_info.link_hash
    ORDER BY rating.rating_rank
    OFFSET ${offset} LIMIT ${count}
    `
  } else {
    return 'Введен неверный тип'
  }
  
  let norms = await queryPg(res, ratingQuery);

  norms.map((norm) => {
    if (type == 'norms') {
      let labelArr = norm.point_label.split('.');
      let label = labelArr[labelArr.length - 1];
      norm.label = label;
    }

    norm.rating = Math.round(norm.rating*100)/100;
    norm.relevance = Math.round(norm.relevance*100)/100;
    norm.obscurity = Math.round(norm.obscurity*100)/100;
    norm.problem_share = Math.round(norm.problem_share*100)/100;
  })

  return norms;
}

module.exports = getRating;
