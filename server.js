// Por defecto a 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Autorización para el uso de modulos: mongoose, express
var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

// Instancia del módulo mongoose
var db = mongoose();
// Instancia del módulo express
var app = express();
// Instancia del módulo passport
var passport = passport();

// Puerto de escucha para el servidor
app.listen(3000);

// Nos devuelve el objeto 'app'
module.exports = app;

// Mensaje para aparecer en consola del correcto arranque del servidor
console.log('Servidor ejecutandose en http://localhost:3000/');
