module.exports={
  // URI de conexiǫn a la base de datos
  db: 'mongodb://localhost/medicalhistory',

  // String Secreto para la sesión
  sessionSecret: 'StringSecreto',

  // Credenciales para OAuth de google
  google:{
    clientID: '917353860358-5mtvjoa0p88qlmsiu17vmbhar4bj9336.apps.googleusercontent.com',
    clientSecret: 'EYJUHFYVh01V4C7LBVFSczhw',
    callbackURL: 'http://localhost:3000/oauth/google/callback'
  }
};
