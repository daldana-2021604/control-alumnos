//Importación
const { response, request } = require('express');

//Modelos
const Asignacion = require('../models/asignacion');

const getAsignacionUsuario = async (req = request, res = response) => {
    const { params } = req.params;
    const listaAsignacion = await Promise.all([

        Asignacion.countDocuments(params),
        Asignacion.find(params)
    ]);

    res.json({
        msg: 'GET API de cursos',
        listaAsignacion
    })
}

const postAsignacion = async (req = request, res = response) => {
    //operador spread
    const { curso, usuario } = req.body;

    const cantidadAsignaciones = await Promise.all([

        Asignacion.countDocuments(usuario),
    ]);
    if (cantidadAsignaciones == 3) {
        res.status(201).json({
            msg: 'Ya existen 3 asignaciones a cursos'
        })
    }else{
        //Generar data a guardar
    const data = {
        curso,
        usuario
    }

    const asignacion = new Asignacion(data)

    //Guardar en la DB
    await asignacion.save();

    res.status(201).json({
        msg: 'POST de curso',
        cantidadAsignaciones,
        asignacion
    })
    }

    
}

const putAsignacion = async (req = request, res = response) => {
    const {id} = req.params;
    const {curso, usuario} = req.body;

    
    const data = {
        curso,
        usuario
    }

    const asignacionEditada = await Asignacion.findOneAndReplace(id, data, {new: true});

    res.json ({
        msg: 'PUT curso',
        asignacionEditada
    })
}

const deleteAsignacion = async (req = request, res = response) => {
    const {id} = req.params;
    const asignacionBorrado = await Asignacion.findOneAndDelete(id, {new: true})
    res.json ({
        msg: 'DELETE asignacion',
        asignacionBorrado
    })
}

module.exports = {
    getAsignacionUsuario,
    postAsignacion,
    putAsignacion,
    deleteAsignacion
}