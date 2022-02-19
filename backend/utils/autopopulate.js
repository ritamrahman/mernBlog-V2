module.exports = (field) =>
  function (next) {
    console.log("iam here");
    this.populate(field);
    next();
  };
