//SETTING UP A SUBDOCUMENT COLLETION FOR MONGODB COLLECTION
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Adding all the data we want to get from the survey
//At oprette tables / schemas i mongo db, her bygges der strukturen
const recipientSchema = new Schema({
    email: String,
    response: { type: Boolean, default: false } //Making sure they only respond once.
});

//We are not adding the schema to moongose, instead we export it to the Survey
module.exports = recipientSchema;