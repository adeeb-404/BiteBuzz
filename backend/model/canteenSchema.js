import mongoose from "mongoose";
import baseOrderSchema from "./baseOrderSchema.js";

const { Schema } = mongoose;

const canteenSchema = new Schema({
    Name: { type: String, required: true, unique: true },
    Description: { type: String},
    emailID: { type: String,   lowercase: true },
    photos: [
        { name: String, url: String }
    ],
    owner_name:{type: String, required: true},
    phoneNo: { type: String, required: true },
    password: { type: String},
    rating: Number,

    menu: [{
        photo: String,
        dishName: { type: String, required: true },
        price: { type: Number, required: true },
        preparationTime: String,
        rating: {
            currRating: Number,
            noOfRating: Number
        }}],
        currOrders: [{
            baseOrder: baseOrderSchema,
            expectedTime: { type:String, required: true }
        }],
        history: [baseOrderSchema]
});

const Canteen = mongoose.model('canteen', canteenSchema);

export default Canteen;
