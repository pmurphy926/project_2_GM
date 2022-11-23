const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {type: String},
    number: {type: String, },
    img: {type: String},
    position: {type: String},
    hands: {type: String},
    height: {type: String},
    weight: {type: Number},
    contract: {type: Boolean, default: false},
    years: Number,
    salary: String,
    tags: [String],
    starter: {type: Boolean, default: false},
})

const Player = mongoose.model('Player', playerSchema);
module.exports = Player