import mongoose, { Mongoose } from 'mongoose'
const Packages = new mongoose.Schema({
    title:String,
    link:String,
    gallery:Array,
    duration:String,
    highlights:Array,
    overview:String,
    itinerary:Array,
    inclusions:Array,
    exclusions:Array,
    flights:Object,
    start: Date,
    finish:Date,
    price:Object,
    termConditions:String,
    views:Number,
    country:String,
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Packages', Packages);