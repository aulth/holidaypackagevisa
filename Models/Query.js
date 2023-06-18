import mongoose from 'mongoose'
const Query  = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    message: String,
    seen:{
        type:Boolean,
        default:false
    },
    call:Boolean
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Query', Query);