const moment = require('moment')

const isDate = (value, { req, location, path }) => {

    if (!value) {
        return false;
    }

    const data = moment(value);
    return data.isValid();

}

module.exports = { isDate }