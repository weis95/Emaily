const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

//Adding all the data we want to get from the users into the 
//mongoose collection schema
//At oprette tables / schemas i mongo db, her bygges der strukturen
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], //Setting an array containing a list of strings, importet
    yes: {type: Number, default: 0}, //Setting a default value
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}, //Setting up a relationship to the user collection, the ref is the relation connector
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);