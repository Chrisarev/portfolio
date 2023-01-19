const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const contactSchema = new Schema({
    name: String, 
    email: String,
    phone: Number, 
    comment: String
});

module.exports = mongoose.model('Contact', contactSchema); 