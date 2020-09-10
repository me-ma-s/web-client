function handleError(error, res) {
  console.log(error.stack);
  res.send({error: error.stack});
}

module.exports = handleError;
