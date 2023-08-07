const express = require('express');
const auth = require('../auth/userAuth');
const User = require('../models/user');
const ActiveOrders = require('../models/activeOrders');

const router = new express.Router();

router.post('/users', async function (request, response) {
    const user = new User(request.body);
    try {
        const token = await user.generateAuthToken();
        response.status(201).send({ user, token });
    } catch (error) {
        response.status(500).send({ error: 'Could not Create User', status: 500 });
    }
});

router.post('/users/login', async function (request, response) {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password);
        const token = await user.generateAuthToken();
        response.send({ user, token });
    } catch (error) {
        response.status(400).send(`[-] Unable to login....`);
    }
});

router.get('/users/logout', auth, async function (request, response) {
    try {
        request.user.tokens = (request.user.tokens).filter(token => token.token !== request.token);
        await request.user.save();
        response.send();
    } catch (error) {
        response.status(500).send({ error: 'Unable to Logout...' });
    }
});

router.get('/users/logoutAll', auth, async function (request, response) {
    try {
        request.user.tokens = [];
        await request.user.save();
        response.send();
    } catch (error) {
        response.status(500).send({ error: 'Unable to Logout...' });
    }
});

router.get('/users/fetchProfile', auth, async function (request, response) {
    try {
        response.send(request.user);
    } catch (error) {
        response.status(500).send({ error: 'Could not fetch User Profile...' })
    }
});

router.post('/users/auth', auth, async function (request, response) {
    response.status(200).send({ message: 'Authorised....' });
},
    async function (error, request, response, next) {
        response.status(400).send({ error: 'Unauthorised Access...' });
    }
);

router.post('/users/order', auth, async function (request, response) {
    try {
        console.log(request.body);
        let newOrder = null;
        let exists = null;
        for (let i = 0; i < request.body.length; i++) {
            exists = await ActiveOrders.findOne({
                restaurentName: (request.body[i]).restaurentName,
                foodName: (request.body[i]).foodName,
                email: (request.body[i]).email,
                state: (request.body[i]).state.toLowerCase()
            });

            if (!exists) {
                newOrder = new ActiveOrders(request.body[i]);
                await newOrder.save();
            } else {
                if (exists.state.toLowerCase() !== (request.body[i]).state.toLowerCase()) {
                    newOrder = new ActiveOrders(request.body[i]);
                    await newOrder.save();
                } else {
                    exists.quantity = parseInt(exists.quantity) + parseInt((request.body[i]).quantity);
                    exists.save();
                }
            }
        }
        response.status(200).send({ success: 'Your Order has been placed' });
    } catch (error) {
        response.status(500).send({ error: 'Could not Order. Please try again...' });
    }
});

module.exports = router;