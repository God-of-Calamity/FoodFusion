const express = require('express');
const auth = require('../auth/staffAuth');
const bcrypt = require('bcryptjs');
const Staff = require('../models/staff');

const router = new express.Router();

router.post('/staffs', async function (request, response) {
    const staff = new Staff(request.body);
    try {
        const token = await staff.generateAuthToken();
        response.status(201).send({ staff, token });
    } catch (error) {
        response.status(500).send({ error: 'Could not Create Staff' });
    }
});

router.post('/staffs/login', async function (request, response) {
    try {
        const staff = await Staff.findByCredentials(request.body.email, request.body.password);
        const token = await staff.generateAuthToken();
        response.send({ staff, token });
    } catch (error) {
        console.log(error);
        response.status(400).send({ error: 'Could Not Login User', status: 400 });
    }
});

router.get('/staffs/logout', auth, async function (request, response) {
    try {
        request.staff.tokens = (request.staff.tokens).filter(token => token.token !== request.token);
        await request.staff.save();
        response.send();
    } catch (error) {
        response.status(500).send({ error: 'Unable to Logout...' });
    }
});

router.get('/staffs/logoutAll', auth, async function (request, response) {
    try {
        request.staff.tokens = [];
        await request.staff.save();
        response.send();
    } catch (error) {
        response.status(500).send({ error: 'Unable to Logout...' });
    }
});

router.get('/staffs/fetchProfile', auth, async function (request, response) {
    try {
        response.send(request.staff);
    } catch (error) {
        response.status(500).send({ error: 'Could not fetch User Profile...' })
    }
});

router.post('/staffs/auth', auth, async function (request, response) {
    response.status(200).send({ success: 'Authorised....' });
},
    async function (error, request, response, next) {
        response.status(400).send({ error: 'Unauthorised Access...' });
    }
);

router.post('/staffs/allDetails', async function (request, response) {
    try {
        const data = await Staff.find({ restaurentName: request.body.restaurentName });
        response.send(data);
    } catch (error) {
        console.log(error);
        response.status(500).send();
    }
});

module.exports = router;