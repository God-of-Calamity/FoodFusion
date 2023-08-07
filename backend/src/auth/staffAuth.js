const jwt = require('jsonwebtoken');
const Staff = require('../models/staff');

const auth = async function (request, response, next) {
    try {
        const token = request.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'SecretKey');
        const staff = await Staff.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!staff)
            throw new Error({ error: 'Access Denied', status: 400 })
        request.staff = staff;
        request.token = token;
        next();
    } catch (error) {
        response.status(401).send({ error: `Unauthorised Access...`, status: 400 })
    }
}
module.exports = auth;