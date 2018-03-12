// Requerimos los objetos 'passport', 'passport-local', 'mongoose'
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

// Registramos la estrategía del método passport.use
module.exports = function() {
  passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if(err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Usuario Desconocido / Unknow user'
        });
      }
      if (!user.authenticate(password)) {
        return done (null, false,{
          message: 'Contraseña Inválida / Invalid password'
        });
      }
      return done(null, user);
      });
  }));
};
