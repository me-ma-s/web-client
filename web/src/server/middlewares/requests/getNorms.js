const getNorms = async (req, res) => {
  const { queryPg } = require('./../../services/pg');
  const { axiosGet } = require('./../../services/axios');

  let { offset, count, sort, rankTo, period, profile, search, isCompare, period2, profile2, top } = req.body;

  if (search && (search.length > 0)) {
    search = await axiosGet(res, `http://10.106.78.205:80/windows-services/getQueryExtension?query=${search}`);
    search = search.result;
  }

  let normsQuery = `
    SELECT case when norm_info.doc_title is null then 'Статья утратила силу' else norm_info.doc_title end dod_title,
           case when norm_info.title is null then 'Статья утратила силу' else norm_info.title end norm_title,
           case when norm_info.chapter is null then rating1.link else norm_info.chapter end point_label,
           case when norm_info.base is null then '' else norm_info.base end base,
           case when norm_info.fe is null then 0 else norm_info.fe end fe,
           rating1.rating_rank rating_rank1,
           rating1.rating rating1, rating1.relevance relevance1, rating1.relevance_rank relevance_rank1,
           rating1.obscurity obscurity1, rating1.obscurity_rank obscurity_rank1, rating1.problem_share problem_share1
           ${
            isCompare ?
            `, rating2.rating_rank rating_rank2, rating2.rating rating2, rating2.relevance relevance2, rating2.relevance_rank relevance_rank2,
            rating2.obscurity obscurity2, rating2.obscurity_rank obscurity_rank2, rating2.problem_share problem_share2` : ''
           }
    FROM  rating_prod.norms_${period}_${profile} AS rating1
    ${(search && (search.length>0)) ? '' : 'LEFT'} JOIN doc_part.norm_info ON rating1.link_hash = norm_info.chapter_hash AND rating1.doc_link_hash = norm_info.link_hash
    ${
      isCompare ?
      `JOIN rating_prod.norms_${period2}_${profile2} AS rating2
       ON rating1.link_hash = rating2.link_hash
       AND rating1.doc_link_hash = rating2.doc_link_hash` : ''
    }
    WHERE (rating1.rating_rank <= ${rankTo}${isCompare ? ` OR rating2.rating_rank <= ${rankTo}` : ''})
          ${
            (search && (search.length>0)) ?  ` AND (norm_info.title_index @@ to_tsquery('${search}') OR norm_info.doc_title_index @@ to_tsquery('${search.trim().toLowerCase()}'))` : ''
          }
          ${
            (isCompare && (top=='new')) ? ` AND (rating1.rating_rank <= ${rankTo} AND rating2.rating_rank > ${rankTo})`:
            (isCompare && (top=='old')) ? ` AND (rating1.rating_rank > ${rankTo} AND rating2.rating_rank <= ${rankTo})`: ''
          }
    ORDER BY ${ sort == 'ratingRank1' ? 'rating1.rating_rank' :
                sort == 'ratingRank2' ? 'rating2.rating_rank' :
                sort == 'relevanceRank' ? 'rating1.relevance_rank' :
                sort == 'obscurityRank' ? 'rating1.obscurity_rank' :
                sort == 'shareOfProblem' ? 'rating1.problem_share DESC' :
                sort == 'ranksGrowth' ? 'rating2.rating_rank - rating1.rating_rank DESC' :
                sort == 'ranksGrowth' ? 'rating2.rating_rank  - rating1.rating_rank' : 'rating1.rating_rank'
              }
    OFFSET ${offset} LIMIT ${count}
  `;
  let norms = await queryPg(res, normsQuery);

  norms.map((norm) => {
    let labelArr = norm.point_label.split('.');
    let label = labelArr[labelArr.length - 1];
    norm.label = label;

    norm.rating1 = Math.round(norm.rating1*100)/100;
    norm.relevance1 = Math.round(norm.relevance1*100)/100;
    norm.obscurity1 = Math.round(norm.obscurity1*100)/100;
    norm.problem_share1 = Math.round(norm.problem_share1*100)/100;

    if (isCompare) {
      norm.rating2 = Math.round(norm.rating2*100)/100;
      norm.relevance2 = Math.round(norm.relevance2*100)/100;
      norm.obscurity2 = Math.round(norm.obscurity2*100)/100;
      norm.problem_share2 = Math.round(norm.problem_share2*100)/100;
    }
  })

  return norms;
}

module.exports = getNorms;
