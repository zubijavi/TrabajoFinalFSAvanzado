const Famoso = require('../models/famoso');

// Controlador para mostrar la lista de famosos
exports.getFamosos = async (req, res) => {
  try {
    const famosos = await Famoso.find();
    res.render('database', {
      layout: 'layouts/main',
      title: 'Base de Datos',
      message: 'Lista de famosos',
      famosos
    });
  } catch (error) {
    console.error('Error al obtener los datos:', error.message, error.stack);
    res.status(500).send('Error al obtener los datos');
  }
};
