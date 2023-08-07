const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const StaffSchema = new mongoose.Schema({
    restaurentName: {
        type: String,
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
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
        validate: function (value) {
            if (!validator.isEmail(value))
                throw new Error(`[-] Email is not valid....`)
        },
    },
    password: {
        type: String,
        required: true,
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

StaffSchema.statics.findByCredentials = async function (email, password) {
    const staff = await this.findOne({ email: email });
    if (!staff)
        throw new Error(`[-] Unable to login...`);
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch)
        throw new Error(`[-] Unable to login...`);
    return staff;
}

StaffSchema.pre('save', async function (next) {
    const staff = this;

    if (staff.isModified('password')) {
        staff.password = await bcrypt.hash(staff.password, 8);
    }
    next();
});

StaffSchema.methods.generateAuthToken = async function () {
    const staff = this;
    const token = await jwt.sign({ _id: staff._id.toString() }, 'SecretKey');
    staff.tokens = staff.tokens.concat({ token: token });
    await staff.save();
    return token;
}

StaffSchema.methods.toJSON = function () {
    const staff = this;
    const staffObject = staff.toObject();

    delete staffObject.password;
    delete staffObject.tokens;
    return staffObject;
}


const Staff = mongoose.model('Staff', StaffSchema);

module.exports = Staff;