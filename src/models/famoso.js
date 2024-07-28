const mongoose = require('mongoose');

const famososSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  profesion: { type: String, required: true },
  image: { type: String } // Añadido para almacenar la URL de la imagen
});

const Famoso = mongoose.model('Famoso', famososSchema);

module.exports = Famoso;

