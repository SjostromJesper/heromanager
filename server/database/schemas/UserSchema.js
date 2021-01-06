const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

const User = mongoose.model('user', userSchema)

module.exports = User;
