const mongoose = require('mongoose')

const dbConn = async () => {
    try {
        await mongoose.connect(process.env.conString,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('DB online')

    } catch (error) {
        console.log(error)
        throw new Error('error al conectar bd')
    }
}

module.exports = dbConn;