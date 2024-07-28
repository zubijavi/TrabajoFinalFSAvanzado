const express = require('express');
const hbs = require('hbs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db'); // Ajusta la ruta si es necesario
const appRouter = require('./routes/appRoutes'); // Renombrado de famosoRouter a appRouter

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Configurar el motor de plantillas Handlebars
app.set('view engine', 'hbs');

// Definir la ruta de las vistas y los parciales
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static('uploads'));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar rutas relacionadas con la aplicación
app.use('/', appRouter); // Usar appRouter en lugar de famosoRouter

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render('error404', { 
    layout: 'layouts/main',
    title: 'Error 404' 
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}/`);
});
