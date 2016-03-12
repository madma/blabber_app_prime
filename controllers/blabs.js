
var Blab = require("../models/blab");

function index(req, res, next) {
  Blab
  .find({})
  .then(function(blabs) {
    res.json(blabs); // Return blabs as JSON.
  })
  .catch(
    logAndPassErrors
  );
}

function destroy(req, res, next) {
  Blab
  .findByIdAndRemove(req.params.id)
  .then(function(result) {
    res.json(result);
  })
  .catch(
    logAndPassErrors
  );
}

function logAndPassErrors(err) {
  console.log("Error: ", err);
  next(err);
}

module.exports = {
  index:   index,
  destroy: destroy
};
