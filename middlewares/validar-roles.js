const { request, response  } = require('express');

const esProfesorRole = ( req = request, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }

    //Verificación solo el rol de Admi puede realizar la eliminación
    //Si cumple con el rol de admin se envia al controllador deleteUsuario
    const { rol, nombre  } = req.usuario
    if ( rol !== 'PROFESOR_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es admin - No puede hacer esto`
        });
    }

    next();

}

const esAlumnoRole = ( req = request, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }

    //Verificación solo el rol de Admi puede realizar la eliminación
    //Si cumple con el rol de admin se envia al controllador deleteUsuario
    const { rol, nombre  } = req.usuario
    if ( rol !== 'ALUMNO_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es alumno - No puede hacer esto`
        });
    }

    next();

}

module.exports = {
    esProfesorRole,
    esAlumnoRole
}