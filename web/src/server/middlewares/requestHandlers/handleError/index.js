function handleError(err, res) {
  console.log(err.stack);
  res.send("Error: " + err.stack);
}

module.exports = handleError;
