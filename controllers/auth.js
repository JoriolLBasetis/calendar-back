const { response } = require('express');
const Usuari = require('../models/Usuari');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');


const crearUsuari = async (req, res = response) => {
    try {

        const { email } = req.body;
        let usuari = await Usuari.findOne({ email })

        if (usuari) {
            return res.status(400).json({
                ok: false,
                errors: 'usuari existent amb el correu proporcionat'
            })
        }

        usuari = new Usuari(req.body);
        const salt = bcrypt.genSaltSync();
        usuari.pass = bcrypt.hashSync(usuari.pass, salt);

        await usuari.save();
        const token = await generarToken(usuari.id, usuari.name)

        res.status(201).json({
            ok: true,
            errors: null,
            msg: 'crear',
            uid: usuari.id,
            name: usuari.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: 'error inserció'
        })
    }
}

const loginUsuari = async (req, res = response) => {
    const { email, pass } = req.body;
    try {
        const { email } = req.body;
        const usuari = await Usuari.findOne({ email })

        if (!usuari) {
            return res.status(400).json({
                ok: false,
                errors: 'usuari no existent'
            })
        }

        const valPass = bcrypt.compareSync(pass, usuari.pass);
        if (valPass) {
            const token = await generarToken(usuari.id, usuari.name)

            return res.status(200).json({
                ok: true,
                errors: null,
                msg: 'login',
                uid: usuari.id,
                name: usuari.name,
                token
            })
        }
        else {
            return res.status(400).json({
                ok: false,
                errors: 'usuari no existent'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: 'error login'
        })
    }

}

const renewToken = async (req, res = response) => {

    const { uid, name } = req
    const token = await generarToken(uid, name)
    res.json({
        ok: true,
        errorCode: null,
        uid,
        name,
        token,
        msg: 'renew',

    })
}
module.exports = { crearUsuari, loginUsuari, renewToken }