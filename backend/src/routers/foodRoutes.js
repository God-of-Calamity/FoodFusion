const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const userAuth = require('../auth/userAuth');
const { RestaurentFoods } = require('../models/restaurentFoods');
const Staff = require('../models/staff');
const Manager = require('../models/manager');

const ActiveOrders = require('../models/activeOrders');

const router = new express.Router();

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
            return cb(new Error('Please upload an image'));
        }

        cb(undefined, true);
    }
})

router.post('/foods/addItem', upload.single('imageFile'), async function (request, response) {
    try {
        const buffer = await sharp(request.file.buffer).resize({ width: 271, height: 145 }).png().toBuffer();
        const restaurent = await RestaurentFoods.findOne({ restaurentName: request.body.restaurentName.toLowerCase() });
        const foodItem = { ...request.body };

        foodItem.image = buffer;
        delete foodItem.restaurentName;

        if (!restaurent) {
            const newRestaurent = new RestaurentFoods();
            newRestaurent.restaurentName = request.body.restaurentName;
            newRestaurent.items.push(foodItem);
            newRestaurent.save();
        } else {
            const exists = await RestaurentFoods.findOne({
                restaurentName: (request.body.restaurentName).toLowerCase(),
                'items.foodName': (request.body.foodName).toLowerCase()
            });
            if (exists) {
                return response.status(400).send({ error: 'Food Already Exists...' })
            }
            restaurent.items.push(foodItem);
            restaurent.save();
        }
        response.send({ success: "Food Item Saved...." });
    } catch (error) {
        response.status(500).send({ error: 'Could Not Save Food Items', status: 500 });
    }

}, async function (error, request, response, next) {
    response.status(500).send({ error: 'Could Not Save Food Items', status: 500 });
});

router.get('/AllRestaurents', userAuth, async function (request, response) {
    try {
        const data = await RestaurentFoods.find({}, [
            'restaurentName',
            'items.userName',
            'items.ownerId',
            'items.foodName',
            'items.price',
            'items.time',
            'items.ingredients',
            'items.method',
            'items.tags'
        ]);
        const parsedData = [];

        for (let i = 0; i < data.length; i++) {
            parsedData.push([(data[i]).restaurentName, (data[i]).items]);
        }
        response.send(parsedData);
    } catch (error) {
        response.status(500).send();
    }
});

router.get('/:restaurentName/:foodName', async function (request, response) {
    try {
        const data = await RestaurentFoods.findOne({
            restaurentName: request.params.restaurentName.toLowerCase(),
            'items.foodName': request.params.foodName.toLowerCase()
        });

        for (let i = 0; i < (data.items).length; i++) {
            if (((data.items)[i]).foodName === request.params.foodName.toLowerCase()) {
                response.set('Content-Type', 'image/png')
                response.send(((data.items)[i]).image);
            }
        }
    } catch (error) {
        response.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/:restaurentName/:foodName/resize', async function (request, response) {
    try {
        const data = await RestaurentFoods.findOne({
            restaurentName: request.params.restaurentName.toLowerCase(),
            'items.foodName': request.params.foodName.toLowerCase()
        });

        for (let i = 0; i < (data.items).length; i++) {
            if (((data.items)[i]).foodName === request.params.foodName.toLowerCase()) {
                const buffer = await sharp((data.items[i]).image).resize({ width: 374, height: 176 }).png().toBuffer();
                (data.items[i]).image = buffer
                response.set('Content-Type', 'image/png')
                response.send(((data.items)[i]).image);
            }
        }
    } catch (error) {

    }
});

router.post('/foods/activeOrders', async function (request, response) {
    try {
        const data = await ActiveOrders.find({ restaurentName: request.body.restaurentName });
        response.send(data);
    } catch (error) {
        response.status(500).send({ error: 'Could not fetch active orders...' });
    }
});

router.post('/foods/changeProcessingState', async function (request, response) {
    try {
        const oldOrder = await ActiveOrders.findOne({ _id: request.body._id });
        await oldOrder.remove();
        let queryState = null;

        if (request.body.state.toLowerCase() === 'start') {
            queryState = 'processing';
        } else if (request.body.state.toLowerCase() === 'processing') {
            queryState = 'done';
        }

        const queryOrder = await ActiveOrders.findOne({
            restaurentName: request.body.restaurentName,
            foodName: request.body.foodName,
            email: request.body.email,
            state: queryState
        });

        if (queryOrder) {
            queryOrder.quantity = parseInt(queryOrder.quantity) + parseInt(request.body.quantity);
            await queryOrder.save();
        } else {
            const newActiveOrder = new ActiveOrders({
                restaurentName: request.body.restaurentName,
                userName: request.body.userName,
                email: request.body.email,
                foodName: request.body.foodName,
                quantity: request.body.quantity,
                price: request.body.price,
                time: request.body.time,
                state: queryState
            });
            await newActiveOrder.save();
        }
        response.send();
    } catch (error) {
        console.log(error);
        response.status(500).send({ error: 'Could Not Update Processing State...' });
    }
});

router.post('/foods/userFoodStatus', async function (request, response) {
    try {
        const total = await ActiveOrders.find({
            email: request.body.email,
            userName: request.body.userName,
        });

        const userOrders = await ActiveOrders.find({
            email: request.body.email,
            userName: request.body.userName,
            state: 'done'
        });

        if (total.length === 0) {
            return response.send({ error: true })
        }
        response.send({ error: false, userOrders });
    } catch (error) {
        response.status(500).send({ error: 'Could not fetch status...' });
    }
});

router.post('/foods/getFoods', async function (request, response) {
    try {
        const data = await RestaurentFoods.findOne({ restaurentName: request.body.restaurentName });
        if (!data) {
            return response.send({ message: 'No Food Items Available..', items: [] })
        }

        for (let i = 0; i < (data.items).length; i++) {
            (data.items[i]).image = null;
        }
        response.send(data);
    } catch (error) {
        response.status(500).send({ error: 'Could Not Fetch Data...' });
    }
});

router.delete('/foods/deleteOrder', async function (request, response) {
    const order = await ActiveOrders.findOne({
        restaurentName: request.body.restaurentName,
        foodName: request.body.foodName,
        email: request.body.email
    });
    order.remove();
});

router.delete('/foods/deleteItem', async function (request, response) {
    try {
        const restaurent = await RestaurentFoods.findOne({ restaurentName: request.body.restaurentName.toLowerCase() });
        restaurent.items = (restaurent.items).filter(item => item.foodName !== request.body.foodName.toLowerCase());
        await restaurent.save();
        response.send({ message: 'Element Deleted Successfully...' });
    } catch (error) {
        response.status(500).send({ error: 'Could Not delete element...' });
    }
});

module.exports = router;