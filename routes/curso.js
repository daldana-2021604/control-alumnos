const { Router } = require('express');
const { check } = require('express-validator');

const { getCursos, postCurso, putCurso, deleteCurso } = require('../controllers/curso');
const {validarCampos} = require('../middlewares/validar-campos');
const { emailExiste, esRoleValido, existeCursoPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esProfesorRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar/:id',[
    validarJWT,
    esProfesorRole,
    validarCampos
], getCursos);

router.post('/agregar',[
    validarJWT,
    esProfesorRole,
    check('nombre', 'El nombre del curso es obligatorio').not().isEmpty(),
    check('maestro', 'El maestro del curso es obligatorio').not().isEmpty(),
    validarCampos
], postCurso);

router.put('/editar/:id',[
    validarJWT,
    esProfesorRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    check('nombre', 'El nombre del curso es obligatorio').not().isEmpty(),
    check('maestro', 'El maestro del curso es obligatorio').not().isEmpty(),
    validarCampos
], putCurso);

router.delete('/eliminar/:id',[
    validarJWT,
    esProfesorRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], deleteCurso)

module.exports = router;