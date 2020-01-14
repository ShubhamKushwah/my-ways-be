const Passport = require('passport');
require('../passport')(Passport);
const User = require('../schemas/users');

const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect('/login');
}

module.exports = app => {
  const Router = require('express').Router();

  Router.get('/', (req, res) => {
    res.render('index')
  })

  Router.get('/login', (req, res) => {
    return res.render('login');
  })

  Router.get('/dashboard', loggedIn, (req, res) => {
    if (req.session.passport.user.type === 'student') return res.render('student_dash', { present: req.session.passport.user.present })
    console.log('here')
    User.find({ type: 'student' }).lean().exec((err, docs) => {
      if (err) return redirect('/');
      console.log(docs)
      return res.render('dashboard', { session: req.session, students: docs });
    })
  })

  Router.get('/signup', (req, res) => {
    return res.render('signup');
  })

  Router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  })

  Router.get('/mark/present/:username/:present', async (req, res) => {
    const update = { $set: { present: req.params.present } }
    await User.findOneAndUpdate({ username: req.params.username }, update)
    return res.send();
  })

  Router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, doc) => {
      if (err) return res.status(500).send('Failed to signup');
      else if (doc) {
        return res.send(500).send('User already exists!');
      }
      const user = new User();
      user.username = username;
      user.password = user.hashPassword(password);
      user.type = 'student';
      user.save((err, user) => {
        if (err) return res.status(500).send('Failed to Save!');
        res.send(user)
      })
    })
  })

  Router.post('/login', Passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard'
  }), (err, res) => {
    res.send('Works!');
  })

  return Router;
}