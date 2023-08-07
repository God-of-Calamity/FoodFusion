const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../auth/managerAuth');
const Manager = require('../models/manager');
const { RestaurentFoods } = require('../models/restaurentFoods');

const router = new express.Router();

router.post('/managers', async function (request, response) {
    const existEmail = await Manager.findOne({ email: request.body.email });
    if (existEmail) {
        return response.status(400).send({ error: 'Email already exists' });
    }

    const existAddress = await Manager.findOne({ address: request.body.address });
    if (existAddress) {
        return response.status(400).send({ error: 'Address already exists..' });
    }

    const existName = await Manager.findOne({ restaurentName: request.body.restaurentName });
    if (existName) {
        return response.status(400).send({ error: 'Restaurent-Name already exists...' });
    }

    const manager = new Manager(request.body);
    try {
        const token = await manager.generateAuthToken();
        response.status(201).send({ manager, token });
    } catch (error) {
        console.log(error);
        response.status(500).send({ error: 'Could not Create Manager', status: 500 });
    }
});

router.post('/managers/login', async function (request, response) {
    try {
        const manager = await Manager.findByCredentials(request.body.email, request.body.password);
        const token = await manager.generateAuthToken();
        response.send({ manager, token });
    } catch (error) {
        console.log(error);
        response.status(400).send(`[-] Unable to login....`);
    }
});

router.get('/managers/logout', auth, async function (request, response) {
    try {
        request.manager.tokens = (request.manager.tokens).filter(token => token.token !== request.token);
        await request.manager.save();
        response.send();
    } catch (error) {
        response.status(500).send({ error: 'Unable to Logout...' });
    }
});

router.get('/managers/logoutAll', auth, async function (request, response) {
    try {
        request.manager.tokens = [];
        await request.manager.save();
        response.send();
    } catch (error) {
        response.status(500).send({ error: 'Unable to Logout...' });
    }
});

router.get('/managers/fetchProfile', auth, async function (request, response) {
    try {
        response.send(request.manager);
    } catch (error) {
        response.status(500).send({ error: 'Could not fetch User Profile...' })
    }
});

router.post('/managers/auth', auth, async function (request, response) {
    response.status(200).send({ success: 'Authorised....' });
},
    async function (error, request, response, next) {
        response.status(400).send({ error: 'Unauthorised Access...' });
    }
);

module.exports = router;