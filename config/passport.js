// Invocar modo JavaScript 'strict'
'use strict'

// Requerimos las dependencias de módulos 'passport', 'mongoose'
var passport = require('passport'),
    mongoose = require('mongoose');

// Configuración de la estrategía de Passport.
module.exports = function() {
  // Cargar el modelo 'User'
  var User = mongoose.model('User');

  // Usar el método 'serializeUser' para serializar la id del usuario
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Usar el método 'deserializeUser' para cargar el documento user
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-password -salt', function(err, user) {
      done(err,user);
    });
  });

  // Cargar los archivos de configuración de estrategias de Passport
  require('./strategies/local.js')();
  require('./strategies/google.js')();
};
