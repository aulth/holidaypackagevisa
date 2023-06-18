import mongoose from 'mongoose'
const Widget  = new mongoose.Schema({
    widget1:String,
    widget2:String,
    widget3:String,
    widget4:String,
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Widget', Widget);