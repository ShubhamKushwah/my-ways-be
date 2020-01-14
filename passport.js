const localStrategy = require('passport-local').Strategy;
const User = require('./schemas/users');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  })
  passport.deserializeUser((user, done) => {
    done(null, user);
  })

  passport.use(new localStrategy((username, password, done) => {
    User.findOne({ username }, (err, doc) => {
      if (err) done(err);
      if (doc) {
        const valid = doc.comparePassword(password, doc.password);
        if (valid) {
          done(null, {
            username: doc.username,
            password: doc.password,
            type: doc.type,
            present: doc.present
          })
        } else {
          console.log('INVALID!')
        }
      } else {
        done(null, false);
      }
    })
  }))
}