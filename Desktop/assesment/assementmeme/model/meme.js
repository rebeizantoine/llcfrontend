const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const MemeSchema = new Schema({
    creator: { type: String},
    textCaption: { type: String},
    image: { type: String }
});
const Meme = model('Meme', MemeSchema);

module.exports = Meme;