const { Router } = require('express');
const { getEvents, createEvent, editEvents, deleteEvent } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCamps } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();


router.use(validarJWT)
//Obtenir events
router.get('/', getEvents)

//Obtenir event X
//router.get('/getEvent', getEvent)

//crear event
router.post('/',
    [
        check('title', 'el camp title és obligatori').notEmpty(),
        check('start', 'el camp start és obligatori').not().isEmpty(),
        check('end', 'el camp end és obligatori').notEmpty(),
        check('start', 'el camp start és...').custom(isDate),
        check('end', 'el camp end és...').custom(isDate),

        validarCamps
    ],
    createEvent)


//editar even
router.put('/:id', editEvents)

//eliminar event
router.delete('/:id', deleteEvent)

module.exports = router;