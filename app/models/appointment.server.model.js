// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definición 'AppointmentSchema'
var AppointmentSchema = new Schema({
  created: {
    type: Date,
    // Crea el valor 'created' por defecto
    default: Date.now
  },
  date: {
    type: Date,
    // Validar existencia de valor Date
    required: 'Date is require'
  },
  healthCentre: {
    type: String,
    default: '',
    trim: true
  },
  specialty: {
    type: String,
    default: '',
    trim: true
  },
  doctor: {
    type: String,
    default: '',
    trim: true
  },
  patient: {
    type: String,
    default: '',
    trim: true
  },
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  disorder: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Appointment', AppointmentSchema);
