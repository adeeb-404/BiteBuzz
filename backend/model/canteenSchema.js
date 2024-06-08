import mongoose from "mongoose";
import baseOrderSchema from "./baseOrderSchema.js";

const { Schema } = mongoose;

const canteenSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String},
    email: { type: String,   lowercase: true },
    photo: { type: String},
    owner_name:{type: String, required: true},
    phone: { type: String, required: true },
    password: { type: String},
    rating: Number,

    menu: [{
        photo: String,
        dishName: { type: String, required: true },
        price: { type: Number, required: true },
        preparationTime: Number,
        rating: {
            currRating: Number,
            noOfRating: Number
        }}],

    currOrders: [
        [{
            userID:{type:Schema.Types.ObjectId},
            canteenID:{type:Schema.Types.ObjectId},
            itemName:{type:String},
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            expectedTime: { type:String, required: true }
        }]
    ],
    history: [baseOrderSchema]
});

const Canteen = mongoose.model('canteen', canteenSchema);

export default Canteen;
