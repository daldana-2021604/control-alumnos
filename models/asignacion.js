const {Schema, model} = require('mongoose');

const AsignacionSchema =  Schema({
    curso:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'El campo curso es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'El campo usuario es obligatorio']
    }
})

module.exports = model('Asignacion', AsignacionSchema)