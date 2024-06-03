import mongoose from "mongoose";
const Schema=mongoose.Schema;

const auth=new Schema({
    username:{String,require:true},
    password:{String,require:true}
})
const authorize=mongoose.model('users',auth);

export default authorize;