const express = require('express');
const morgan = require('morgan');
const app = express();
 // const cors = require("cors");


//
// app.use(cors());

// Settings
app.set('port', process.env.PORT || 3000); // Tomar el puerto del server o toma el 3000 x defecto 

// Middleware
app.use(morgan('dev')); // muestra las peticiones en la terminal
app.use(express.json()); // permite interpretar el json de las peticiones

// Routes
app.use('/api/mercadolibre/',require('./routes/api-ml'));
// Server Listen
app.listen(app.get('port'), () => {
    console.log(`listening on http://localhost:`, app.get('port'));
});
