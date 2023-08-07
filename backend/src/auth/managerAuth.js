const jwt = require('jsonwebtoken');
const Manager = require('../models/manager');

const auth = async function (request, response, next) {
    try {
        const token = request.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'SecretKey');
        const manager = await Manager.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!manager)
            throw new Error({ error: 'Access Denied', status: 400 });

        request.manager = manager;
        request.token = token;
        next();
    } catch (error) {
        response.status(401).send({ error: `Unauthorised Access...`, status: 400 })
    }
}
module.exports = auth;