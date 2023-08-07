const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    ownerId: {
        type: mongoose.ObjectId
    },
    foodName: {
        type: String,
        required: true,
        lowercase: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    method: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    tags: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    image: {
        type: Buffer,
    }
}, {
    timestamps: true
});

const restaurentFoodsSchema = new mongoose.Schema({
    restaurentName: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    items: [foodSchema]
}, {
    timestamps: true
});

const RestaurentFoods = mongoose.model('RestaurentFoods', restaurentFoodsSchema);

module.exports = {
    RestaurentFoods,
};