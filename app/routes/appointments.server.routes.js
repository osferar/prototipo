// Invocar modo JavaScript 'strict'
'use strict';

//Cargar las dependencias del módulos
var users = require('../../app/controllers/users.server.controller'),
    appointments = require('../../app/controllers/appointments.server.controller');

// Definir el método routes de module
module.exports = function(app) {
  // Configurar la ruta base de 'appointment'
  app.route('/api/appointments')
     .get(appointments.list)
     .post(users.requiresLogin, appointments.create);

  // Configurar las rutas 'appointment' parametrizadas
  app.route('/api/appointments/:appointmentId')
     .get(appointments.read)
     .put(users.requiresLogin, appointments.hasAuthorization, appointments.update)
     .delete(users.requiresLogin, appointments.hasAuthorization, appointments.delete);

  // Configurar el parámetro middleware 'appointmentId'
  app.param('appointmentId', appointments.appointmentByID);
};
