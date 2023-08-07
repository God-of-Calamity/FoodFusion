const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ManagerSchema = new mongoose.Schema({
    restaurentName: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: function (value) {
            if (!validator.isEmail(value))
                throw new Error(`[-] Email is not valid....`)
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: function (value) {
            if (value.length < 6 || value === 'password')
                throw new Error(`[-] Weak Password...`)
        }
    },
    address: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
});

ManagerSchema.statics.findByCredentials = async function (email, password) {
    const manager = await this.findOne({ email: email });
    if (!manager)
        throw new Error(`[-] Unable to login...`);

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch)
        throw new Error(`[-] Unable to login...`);
    return manager;
}

ManagerSchema.methods.generateAuthToken = async function () {
    const manager = this;
    const token = await jwt.sign({ _id: manager._id.toString() }, 'SecretKey');
    manager.tokens = manager.tokens.concat({ token: token });
    await manager.save();
    return token;
}

// MIDDLEWARE TO HASH PASSWORD
ManagerSchema.pre('save', async function (next) {
    const manager = this;
    if (manager.isModified('password')) {
        manager.password = await bcrypt.hash(manager.password, 8);
    }
    next();
});

ManagerSchema.methods.toJSON = function () {
    const manager = this;
    const managerObject = manager.toObject();

    delete managerObject.password;
    delete managerObject.tokens;
    return managerObject;
}

const Manager = mongoose.model('Manager', ManagerSchema);

module.exports = Manager;