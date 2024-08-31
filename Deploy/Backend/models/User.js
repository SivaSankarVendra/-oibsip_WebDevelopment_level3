const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('user',userSchema);