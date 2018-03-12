// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'appointments'
angular.module('appointments').factory('Appointments', ['$resource', function($resource) {
  // Usar el service '$resource' para devolver un objeto '$resource' appointment
  return $resource('api/appointments/:appointmentId', {
    appointmentId: '@_id'
  },{
    update: {
      method: 'PUT'
    }
  });
}]);
