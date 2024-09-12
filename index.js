const express = require('express');
const dbConn = require('./database/config');
const cors = require('cors')
require('dotenv').config();

// crear server express
const app = express();
dbConn();
/*
app.get('/', (req, res) => {
    console.log('es requereix el /')
    res.json({
        ok: true,
        errorCode: null
    })
})*/
app.use(cors())
app.use(express.static('public'));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//escoltar peticions
app.listen(process.env.PORT, () => {
    console.log(`seridor corrent en el port ${process.env.PORT}`)
})