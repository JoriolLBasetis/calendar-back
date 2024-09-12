const jwt = require('jsonwebtoken');

const generarToken = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload,
            process.env.secret,
            { expiresIn: '2h' },
            (err, token) => {
                if (err) {
                    reject('ha fallat el token')
                }
                resolve(token);
            })

    })
}

module.exports = { generarToken }