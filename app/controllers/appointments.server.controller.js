// Invocar modo 'strict' de JavaScript
'use strict'

// Cargar las dependdencias del módulo
var mongoose = require('mongoose'),
    Appointment = mongoose.model('Appointment');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors){
      if (err.errors[errName].message)
        return err.errors[errName].message;
    }
  } else {
    return 'Error de servidor desconocido';
  }
};

// Crear un nuevo método controller para crear nuevas citas
exports.create = function(req, res) {
  var appointment = new Appointment(req.body);

  // Configurar la propiedad 'creador' de la cita
  appointment.creador = req.user;

  // Intentar guardar la cita
  appointment.save(function(err) {
    if (err) {
      // Si ocurre algún error enviar el mensaje de error
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Enviar una representación JSON de la cita
      res.json(appointment);
    }
  });
};

// Crear un nuevo método controller que recupera una lista de citas
exports.list = function(req, res) {
  // Usar el método model 'find' para obtener una lista de citas
  Appointment.find().sort('-created').populate('creador','firstName lastName fullName').exec(function(err, appointments){
    if (err){
      // Si ocurre un error enviar un mensaje de error
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Enviar una represtación JSON de la cita
      res.json(appointments);
    }
  });
};

// Crear un nuevo método controller que devuelve una cita existente
exports.read = function(req, res) {
  res.json(req.appointment);
};

// Crear un nuevo método controller que actualiza una cita
exports.update = function(req, res) {
  // Obtener la cita usando el objeto 'request'
  var appointment = req.appointment;

  // Actualiza los campos de la cita
  appointment.date = req.body.date;
  appointment.healthCentre = req.body.healthCentre;
  appointment.specialty = req.body.specialty;
  appointment.doctor = req.body.doctor;
  appointment.patient = req.body.patient;
  appointment.disorder = req.body.disorder;

  // Intentar guardar la cita actualizada
  appointment.save(function(err) {
      if(err) {
        // Si ocurre un error enviar el mensaje de error
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        // Enviar una represtación JSON de la cita
        res.json(appointment);
      }
  });
};

// Crear un nuevo método controller que borre la cita existente
exports.delete = function(req, res) {
  var appointment = req.appointment;

  // Usa el método 'remove' para eliminar la cita
  appointment.remove(function(err){
    if (err) {
      // Si ocurre un error enviar el mensaje de error
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Enviar una represtación JSON de la cita
      res.json(appointment);
    }
  });
};

// Crear un nuevo método controller middleware que recupera una única cita existente
exports.appointmentByID = function(req, res, next, id) {
  // Usar el método static 'findOne' para encontrar una cita específica
  Appointment.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err,appointment) {
    if (err)
      // llama al siguiente middleware con un mensaje de error
      return next(err);
    if(!appointment) return next(new Error('Failed to load appointment' + id));

    // Si una cita es encontrada usar el objeto 'request' para pasarlo al siguiente middleware
    req.appointment = appointment;

    // Llamar al siguiente middleware
    next();
  });
};

// Crea un nuevo controller middleware para autorizar una operación appointment
// TODO: añadir que pueda crear y/o modificar los médicos
exports.hasAuthorization = function(req, res, next) {
  // si el usuario actual no es creador de la cita, enviar el mensaje de error apropiado
  if (req.appointment.creador.id !== req.user.id) {
    return res.status(403).send({
      message: 'Usuario no está autorizado'
    });
  }

  // Llama al siguiente middleware
  next();
};
