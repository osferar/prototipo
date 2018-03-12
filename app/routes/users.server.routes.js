// Invocar modo 'strict' de JavaScript
'use strict'

// Cargar el controller 'users'
var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

// Definir el método routes module
module.exports = function(app) {
  // Configurar las rutas 'signup'
  app.route('/signup')
     .get(users.renderSignup)
     .post(users.signup);

  // Configurar las rutas 'signin'
  app.route('/signin')
     .get(users.renderSignin)
     .post(passport.authenticate('local', {
       successRedirect: '/',
       failureRedirect: '/signin',
       failureFlash: true
     }));

  // Configurar las rutas Google OAuth
  app.get('/oauth/google', passport.authenticate('google',{
    scope:[
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    failureRedirect: '/signin'
  }));
  app.get('/oauth/google/callback', passport.authenticate('google',{
    failureRedirect: 'signin',
    successRedirect: '/'
  }));

  // Configurar la route 'signout'
  app.get('/signout', users.signout);
};