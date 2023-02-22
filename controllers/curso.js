//Importación
const { response, request } = require('express');

//Modelos
const Curso = require('../models/curso');

const getCursos = async (req = request, res = response) => {
    const { params } = req.params;
    const listaCursos = await Promise.all([

        Curso.countDocuments(params),
        Curso.find(params)
    ]);

    res.json({
        msg: 'GET API de cursos',
        listaCursos
    })
}

const postCurso = async (req = request, res = response) => {
    //operador spread
    const { usuario, ...body } = req.body;

    //Validacion si existe un producto en la db
    const cursoEnDB = await Curso.findOne({ nombre: body.nombre })
    if (cursoEnDB) {
        res.status(400).json({
            msg: `El curso ${cursoEnDB.nombre} ya existe en la DB`
        })
    }

    //Generar data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario.nombre
    }

    const curso = new Curso(data)

    //Guardar en la DB
    await curso.save();

    res.status(201).json({
        msg: 'POST de curso',
        curso
    })
}

const putCurso = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, usuario, ...data} = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const cursoEditado = await Curso.findOneAndReplace(id, data, {new: true});

    res.json ({
        msg: 'PUT curso',
        cursoEditado
    })
}

const deleteCurso = async (req = request, res = response) => {
    const {id} = req.params;
    const cursoBorrado = await Curso.findOneAndDelete(id, {new: true})
    res.json ({
        msg: 'DELETE curso',
        cursoBorrado
    })
}

module.exports = {
    getCursos,
    postCurso,
    putCurso,
    deleteCurso
}