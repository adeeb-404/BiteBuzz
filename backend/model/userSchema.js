import mongoose, { Schema } from "mongoose";
import baseOrderSchema from "./baseOrderSchema.js";
const userSchema= new Schema({
    USN: { type: String, required: true, unique: true , match: /^4NI\d{2}[a-z][A-Z]\d{3}$/ },
    Name: { type: String, required: true },
    emailID: { type: String, required: true, unique: true, lowercase: true },
    phoneNo: { type: String, required: true, match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] },
    password: { type: String, required: true },
    orders: [{
        baseOrderSchema,
        expectedTime: { type: String     }
    }],
    history: [baseOrderSchema]
})


const User = mongoose.model('User', userSchema);

export default User