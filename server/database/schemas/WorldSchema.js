const mongoose = require('mongoose');
const {Schema} = mongoose;

const worldSchema = new Schema({
    _id: String,
    worldTiles: [[]],
    creatures: Map
}, {timestamps: true})


const WorldModel = mongoose.model('world', worldSchema)

module.exports = WorldModel;