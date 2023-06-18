import mongoose from 'mongoose'
const Menulink  = new mongoose.Schema({
    menuTitle1: String,
    menuLink1: String,
    menuTitle2: String,
    menuLink2: String,
    menuTitle3: String,
    menuLink3: String,
    menuTitle4: String,
    menuLink4: String,
    menuTitle5: String,
    menuLink5: String,
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Menulink', Menulink);