module.exports = (req, res, next) => {
  if (userIN) {
    res.redirect('/');
  } else {
    next();
  }
};
