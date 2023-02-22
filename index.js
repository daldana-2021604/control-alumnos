require('dotenv').config();

//Inportación de configuración de server
const Server = require('./models/servers');

const serverIniciado = new Server();

serverIniciado.listen();