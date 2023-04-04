const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    let same = await bcrypt.compare(password, user.password);
    if (same) {
      //USER SESSION
      req.session.userID = user._id;
      res.status(200).redirect('/');
    } else {
      res.send('UNAUTHORIZED!!');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = async (req,res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
}

exports.getDashboardPage = async (req,res) => {
  const user = await User.findOne({_id: req.session.userID});
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user
  })
}