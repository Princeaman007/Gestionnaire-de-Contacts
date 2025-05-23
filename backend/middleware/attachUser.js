module.exports = (req, res, next) => {
  if (req.user && req.user.id) {
    req.body.user = req.user.id;
  }
  next();
};
