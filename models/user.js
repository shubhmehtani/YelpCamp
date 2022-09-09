const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const passportLocalMongoose= require('passport-local-mongoose');

const UserScema= new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserScema.plugin(passportLocalMongoose);

module.exports= mongoose.model('User', UserScema);