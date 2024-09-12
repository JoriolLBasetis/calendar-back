const { Router } = require('express');
const router = Router();
const { crearUsuari, loginUsuari, renewToken } = require('../controllers/auth')
const { check } = require('express-validator');
const { validarCamps } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/new',
    [
        check('name', 'el nom és obligatori').not().isEmpty(),
        check('email', 'el email és obligatori').isEmail(),
        check('pass', 'el pass és obligatori').not().isEmpty(),
        check('pass', 'ha de ser de 6 caracters').isLength({ min: 6 }),
        validarCamps
    ], crearUsuari);

router.post('/',
    [
        check('email', 'el email és obligatori').isEmail(),
        check('pass', 'el pass és obligatori').not().isEmpty(),
        check('pass', 'ha de ser de 6 caracters').isLength({ min: 6 }),
        validarCamps
    ]
    , loginUsuari);

router.get('/renew', [validarJWT

], renewToken);

module.exports = router