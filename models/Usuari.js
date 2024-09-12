const { Schema, model } = require('mongoose')

const UsuariSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },

})

module.exports = model('Usuari', UsuariSchema)