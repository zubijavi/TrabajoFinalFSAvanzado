const axios = require('axios');

// Controlador para obtener personajes de Harry Potter
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
