import mongoose from 'mongoose'
const Quote  = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    pax:Number,
    departureCity:String,
    destinationCity:String,
    date: Date,
    days:Number,
    message:String,
    seen:{
        type: Boolean,
        default:false
    }
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Quote', Quote);