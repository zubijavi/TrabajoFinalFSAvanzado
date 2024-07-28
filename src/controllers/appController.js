// src/controllers/appController.js
const Famoso = require('../models/famoso');
const axios = require('axios');

exports.getHome = (req, res) => {
  res.render("index", {
    layout: "layouts/main",
    title: "Full Stack Avanzado",
    message: "Pagina Principal",
  });
};

exports.getHarryPotterCharacters = async (req, res) => {
  const searchTerm = req.query.search || '';

  try {
    const response = await axios.get('https://hp-api.herokuapp.com/api/characters');

    const characters = response.data.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (character.house && character.house.toLowerCase().includes(searchTerm.toLowerCase()))
    ).map(character => ({
      name: character.name,
      house: character.house,
      dateOfBirth: character.dateOfBirth,
      image: character.image || '/assets/noImg.jpeg'
    }));

    res.render('api', {
      layout: 'layouts/main',
      title: 'Harry Potter API',
      characters,
      searchTerm
    });
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    res.status(500).send('Error al obtener datos de la API');
  }
};

exports.getFamosos = async (req, res) => {
  try {
    const { nombre, profesion } = req.query;

    // Construir el filtro de búsqueda
    const filtro = {};
    if (nombre) filtro.nombre = new RegExp(nombre, 'i'); // Búsqueda insensible a mayúsculas
    if (profesion) filtro.profesion = profesion;

    // Buscar en la base de datos con el filtro aplicado
    const famosos = await Famoso.find(filtro);
    const cantidadRegistros = famosos.length; // Contar la cantidad de registros

    res.render('database', {
      layout: 'layouts/main',
      title: 'Base de Datos',
      message: 'Lista de famosos',
      famosos,
      cantidadRegistros // Pasar la cantidad de registros a la vista
    });
  } catch (error) {
    console.error('Error al obtener los datos:', error.message, error.stack);
    res.status(500).send('Error al obtener los datos');
  }
};



exports.getAddFamoso = (req, res) => {
  res.render('add-famoso', {
    layout: 'layouts/main',
    title: 'Agregar Nuevo Famoso'
  });
};

exports.postAddFamoso = async (req, res) => {
  try {
    const { nombre, profesion } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const nuevoFamoso = new Famoso({
      nombre,
      profesion,
      image
    });

    await nuevoFamoso.save();
    res.redirect('/database');
  } catch (error) {
    console.error('Error al agregar el famoso:', error);
    res.status(500).send('Error al agregar el famoso');
  }
};

exports.getEditFamoso = async (req, res) => {
  try {
    const { id } = req.params;
    const famoso = await Famoso.findById(id);

    if (!famoso) {
      return res.status(404).send('Famoso no encontrado');
    }

    res.render('edit-famoso', {
      layout: 'layouts/main',
      title: 'Editar Famoso',
      famoso
    });
  } catch (error) {
    console.error('Error al obtener el famoso para editar:', error);
    res.status(500).send('Error al obtener el famoso para editar');
  }
};

exports.postEditFamoso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, profesion } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const resultado = await Famoso.findByIdAndUpdate(id, { nombre, profesion, image }, { new: true });

    if (!resultado) {
      return res.status(404).send('Famoso no encontrado');
    }

    res.redirect('/database');
  } catch (error) {
    console.error('Error al actualizar el famoso:', error);
    res.status(500).send('Error al actualizar el famoso');
  }
};

exports.postDeleteFamoso = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Famoso.findByIdAndDelete(id);

    if (!resultado) {
      return res.status(404).send('Famoso no encontrado');
    }

    res.redirect('/database');
  } catch (error) {
    console.error('Error al eliminar el famoso:', error);
    res.status(500).send('Error al eliminar el famoso');
  }
};
