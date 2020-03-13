const mongoose = require('mongoose');
const { Schema } = mongoose;

//Adding all the data we want to get from the users into the 
//mongoose collection schema
//At oprette tables / schemas i mongo db, her bygges der strukturen
const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0} 
});

mongoose.model('users', userSchema);