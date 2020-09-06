module.exports = function setPropertiesToId(arr, idName = 'id') {
  let ret = {};
  for (let elem of arr) {
    ret[elem[idName]] = elem;
  }
  return ret;
}