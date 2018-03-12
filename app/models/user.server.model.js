// Invocar el modo JavaScript 'strict'
'use strict';

// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

// Definición 'UserSchema'
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    // Validar el formato email
    match: [/.+\@.+\..+/, "Introduzca un e-mail válido / Please fill a valid e-mail address"]
  },
  username: {
    type: String,
    // Configurar un único index 'username'
    unique: true,
    // Validar existencia de valor 'username'
    required: 'Nombre de usuario es obligatorio / Username is required',
    // Trim (quitar espacios) el campo 'username'
    trim: true
  },
  password: {
    type: String,
    // Validar el valor length (tamaño) de 'password'
    validate: [
      function(password) {
        return password && password.length > 6;
      },
      'La contraseña ha de tener más de 6 caracteres / Password should be longer'
    ]
  },
  // Para poder hacer hash del password
  salt: {
    type: String
  },
  // Almacena la estrategía usada para registrar al usuario
  provider: {
    type: String,
    // Validar existencia de valor Provider
    required: 'Provider is required'
  },
  // Almacena el id del usuario para la estrategía de identificación
  providerId: String,
  // Almacenar el objeto 'user' al utilizar proveedores OAuth
  providerData: {},
  created: {
    type: Date,
    // Crea el valor 'created' por defecto
    default: Date.now
  }
});

// Configurar la propiedad virtual 'fullname'
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

// Usar un middleware pre-save para hash la contraseña
UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

// Crear un método instancia para hashing una contraseña
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Crear un método instancia para autentificar usuario
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

// Encontrar posibles username no usados
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;

  // Añadir un sufijo 'username'
  var possibleUsername = username + (suffix || '');

  //Usar el método 'findOne' del model 'User' para encontrar un username único disponible
  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    // Si ocurre un error llama al callback` con un valor null, en otro caso encuentra un username disponible único
    if (!err) {
      // si un username único disponible fue encontrado llama al método callback, en otro caso llama al método 'findUniqueUsername' de nuevo con un nuevo sufijo
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

// Configurar el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
UserSchema.set('toJSON',{
  getters: true,
  virtuals: true
});

// Crear el modelo 'User' a partir del 'UserSchema'
mongoose.model('User', UserSchema);
