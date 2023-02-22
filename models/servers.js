const express = require('express');
const cors = require('cors')
const {dbConection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth : '/api/auth',
            usuarios : '/api/usuarios',
            cursos : '/api/cursos',
            asignacion : '/api/asignacion'
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        //Rutas de mi app
        this.routes();
    }

    //Metodo de coneccion a Mongo
    async conectarDB(){
        await dbConection();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico del proyecto
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.use( this.paths.auth , require('../routes/auth') );
        this.app.use( this.paths.usuarios , require('../routes/usuario') );
        this.app.use( this.paths.cursos, require('../routes/curso'));
        this.app.use( this.paths.asignacion , require('../routes/asignacion') );
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }
}

module.exports = Server;