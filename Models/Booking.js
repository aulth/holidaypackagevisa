import mongoose, { Mongoose } from 'mongoose'
const Booking = new mongoose.Schema({
    bookingNumber: String,
    type:String,
    data:Object,
    paymentCompleted:Boolean,
    sessionId:String,
    seen:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Booking', Booking);