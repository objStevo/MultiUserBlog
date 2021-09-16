const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,//whitespace will be trimmed out
        required: true,
        max: 32,
        unique: true,
        index: true,//It means indexable or able to be queried
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,//whitespace will be trimmed out
        required: true,
        unique: true,
        lowercase: true
    },
    profile: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    about: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamp: true});
// Below we are using a virtual to set three different key values in the document. Instead of just one (Benefit of virtual)
userSchema
    .virtual('password')
    .set(function(password){
        //create a temp variable called _password
        this._password = password;
        //generate salt
        this.salt = this.makeSalt();
        //encryptPassword
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto
                .createHmac('sha1',this.salt)
                .update(password)
                .digest('hex');
        }catch(err){
            console.error(err);
            return '';
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf() + Math.random()) + '';
    }
}; 

module.exports = mongoose.model('User',userSchema);