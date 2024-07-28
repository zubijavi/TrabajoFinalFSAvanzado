const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController'); // Asegúrate de que esta ruta sea correcta
const upload = require('../config/upload'); // Asegúrate de que esta ruta sea correcta

// Define las rutas y asegura que las funciones existan en appController
router.get('/', appController.getHome);
router.get('/api', appController.getHarryPotterCharacters); // Cambiado para coincidir con la función en apiController
router.get('/database', appController.getFamosos); // Cambiado para coincidir con la función en databaseController
router.get('/famosos/add', appController.getAddFamoso);
router.post('/famosos', upload.single('image'), appController.postAddFamoso);
router.get('/famosos/edit/:id', appController.getEditFamoso);
router.post('/famosos/edit/:id', upload.single('image'), appController.postEditFamoso);
router.post('/famosos/delete/:id', appController.postDeleteFamoso);

module.exports = router;
