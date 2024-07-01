import mongoose from "mongoose";
import baseOrderSchema from "./baseOrderSchema.js";

const { Schema } = mongoose;

const canteenSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  email: { type: String, lowercase: true },
  photo: { type: String },
  canteenName: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String },
  rating: Number,
  menu: [
    {
      photo: String,
      dishName: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      preparationTime: Number,
      rating: {
        currRating: Number,
        noOfRating: Number,
      },
    },
  ],
  storage: [
    {
      photo: String,
      dishName: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      quantity:{type:Number,required:true},
      preparationTime: Number,
      rating: {
        currRating: Number,
        noOfRating: Number,
      },
    },
  ],
  currOrders: [
    {
      name: { type: String },
      usn: { type: String },
      arrivalTime:{type: String},
      totalPrice: { type: Number, required: true },
      orders:[
        {
        // canteenName:{type:String},
        photo:String,
      itemName: { type: String },
      quantity: { type: Number, required: true },
      rating: {
        currRating: Number,
        noOfRating: Number,
      },    
      expectedTime: { type: String, required: true },
        }      
      ],
    },
  ],
  history: [
    {
      name: { type: String },
      usn: { type: String },
      arrivalTime:{type: String},
      price: { type: Number},
      orders: [
        {
          userID: { type: Schema.Types.ObjectId },
          canteenID: { type: Schema.Types.ObjectId },
          photo:String,
          itemName: { type: String },
          quantity: { type: Number, required: true },
          rating: {
            currRating: Number,
            noOfRating: Number,
          },  
          expectedTime: { type: String, required: true },
        },
      ],
    },
  ],
});

const Canteen = mongoose.model("canteen", canteenSchema);

export default Canteen;

