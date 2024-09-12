const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hi ha token a la peticio'
        })
    }
    try {
        console.log(token, process.env.secret)
        const payload = jwt.verify(token, process.env.secret);
        console.log(payload);

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valid', error
        })
    }
    next()
}

module.exports = { validarJWT }