const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
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

UserSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email: email });
    if (!user)
        throw new Error(`[-] Unable to login...`);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error(`[-] Unable to login...`);
    return user;
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, 'SecretKey');
    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    return token;
}

// MIDDLEWARE TO HASH PASSWORD
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;