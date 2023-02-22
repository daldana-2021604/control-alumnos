const { Router } = require('express');
const { check } = require('express-validator');

const { getAsignacionUsuario, postAsignacion, putAsignacion, deleteAsignacion } = require('../controllers/asignacion');
const {validarCampos} = require('../middlewares/validar-campos');
const { emailExiste, esRoleValido, existeCursoPorId, existeAsignacionPorId, existeMasDeTresAsignaciones } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esProfesorRole, esAlumnoRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar/:id',[
    validarJWT,
    validarCampos
], getAsignacionUsuario);

router.post('/agregar',[
    validarJWT,
    esAlumnoRole,
    check('curso', 'El nombre del curso es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario del curso es obligatorio').not().isEmpty(),
    validarCampos
], postAsignacion);

router.put('/editar/:id',[
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('curso', 'El nombre del curso es obligatorio').not().isEmpty(),
    check('usuario', 'El maestro del curso es obligatorio').not().isEmpty(),
    validarCampos
], putAsignacion);

router.delete('/eliminar/:id',[
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeAsignacionPorId ),
    validarCampos
], deleteAsignacion)

module.exports = router;