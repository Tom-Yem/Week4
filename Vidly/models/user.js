const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const schema = new mongoose.Schema({
    name:{ 
        type: String,
        minlength:5,
        maxlength:50,
        required:true
    },
    email:{ 
        type: String,
        minlength:5,
        maxlength:255,
        required:true,
        unique:true
    },
    password:{ 
        type: String,
        minlength:5,
        maxlength:1024,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false}
})
schema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('privateKey'));
    return token;
}
const User = mongoose.model('users',schema);

function validateUser(user){
   const schema = {
       name: Joi.string().min(5).max(50).required(),
       email: Joi.string().min(5).max(255).required().email(),
       password: Joi.string().min(5).max(1024).required()
   }
   return Joi.validate(user,schema);
}


module.exports.User = User;
module.exports.validateUser = validateUser;