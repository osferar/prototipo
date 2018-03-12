// Carga el archivo de configuración de entorno correcto
module.exports = require('./env/' + process.env.NODE_ENV + '.js');
