// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulp routes de 'appointments'
angular.module('appointments').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/appointments', {
      templateUrl: 'appointments/views/list-appointments.client.view.html'
    }).
    when('/appointments/create', {
      templateUrl: 'appointments/views/create-appointment.client.view.html'
    }).
    when('/appointments/:appointmentId', {
      templateUrl: 'appointments/views/view-appointment.client.view.html'
    }).
    when('/appointments/:appointmentId/edit', {
      templateUrl: 'appointments/views/edit-appointment.client.view.html'
    });
  }
]);
