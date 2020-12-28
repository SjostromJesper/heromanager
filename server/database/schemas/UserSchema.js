const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema({
    local: {
        email: {type: String, unique: true, required: true},
        hash: {type: String},
        salt: {type: String}
    },
    name: {
        Type: String,
        required: false
    },
    characterIds: {
        type: [],
        required: false
    },
    currentCharacterId: {
        type: String,
        required: false
    },
    resetPasswordToken: {type: String, required: false},
    resetPasswordExpires: {type: String, required: false}
}, {timestamps: true})


userSchema.methods.setPassword = function (password) {
    this.local.salt = crypto.randomBytes(16).toString("hex");
    this.local.hash = crypto
        .pbkdf2Sync(password, this.local.salt, 128, 128, "sha512")
        .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.local.salt, 128, 128, "sha512")
        .toString("hex");
    return this.local.hash === hash;
};

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign(
        {
            email: this.email,
            id: this._id,
            exp: parseInt("" + expirationDate.getTime() / 1000, 10)
        },
        "secret"
    );
};

userSchema.methods.toAuthJSON = function (token) {
    return {
        _id: this._id,
        email: this.local.email,
        token: token,
        username: this.username
    };
};

const User = mongoose.model('user', userSchema)

module.exports = User;
