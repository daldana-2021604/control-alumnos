const {Schema, model} = require('mongoose');

const CursoSchema =  Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion:{
        type: String,
        default: ''
    },
    maestro: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'El campo maestro es obligatorio']
    }
})

module.exports = model('Curso', CursoSchema)