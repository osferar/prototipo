// Invocar modo JavaScript 'strict'
'use strict';

// Crear un nuevo método controller 'render'
exports.render = function (req, res) {
  if (req.session.lastVisit){
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();

  // Usar el objeto 'response' para renderizar la view 'index' con un 'title'
  res.render('index',{
    title: 'Medical History',
    user: JSON.stringify(req.user)
  });
};
