const Usuario = require('../models/usuario');
const Role = require('../models/role');
const Curso = require('../models/curso');
const Asignacion = require('../models/asignacion');
const { request } = require('express');

const emailExiste = async( correo = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeUsuario = await Usuario.findOne( { correo } );
    if ( existeEmailDeUsuario) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const esRoleValido = async( rol = '') => {
    //Verificar si el rol es valido y existe en la DB
    const existeRolDB = await Role.findOne( { rol } );
    if ( !existeRolDB ) {
        throw new Error(`El rol ${ rol }, no existe en la DB `);
    }
}

const existeUsuarioPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfUser = await Usuario.findById( id );
    if ( !existIdOfUser ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeCursoPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfCurse = await Curso.findById( id );
    if ( !existIdOfCurse ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }
}

const existeAsignacionPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfAssignment= await Asignacion.findById( id );
    if ( !existIdOfAssignment ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }
}

// const existeMasDeTresAsignaciones = async (req = request) =>{
//     const { usuario } = req.body;
//     const cantidadAsignaciones = await Promise.all([

//         Asignacion.countDocuments(usuario)
//     ]);

//     if (cantidadAsignaciones == 4) {
//         throw new Error(`No puede asignarse a más cursos`);
//     }
// }

module.exports = {
    emailExiste,
    esRoleValido,
    existeUsuarioPorId,
    existeCursoPorId,
    existeAsignacionPorId
}