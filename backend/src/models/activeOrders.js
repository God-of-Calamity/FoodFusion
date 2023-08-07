const mongoose = require('mongoose');
const validator = require('validator');

const ActiveOrdersSchema = new mongoose.Schema({
    restaurentName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    foodName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    quantity: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        lowercase: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const ActiveOrders = mongoose.model('ActiveOrders', ActiveOrdersSchema);

module.exports = ActiveOrders