import mongoose, { Schema } from "mongoose";
import baseOrderSchema from "./baseOrderSchema";
const canteenSchema=new Schema({
    Name: { type: String, required: true, unique: true },
    Desciption: { type: String, required: true, },
    emailID: { type: String, required: true, unique: true,lowercase:true },
    photos:[
        {data: Buffer, contentType: String }],
    owner:[
        {type:String, required:true ,unique:true},
        {DOB: Date,required:true},
        {phoneNo:Number}
    ],
    password:{ type: String, required: true},
    rating:Number,

    menu:[{
        itemID:Number,
        photo:{
            data: Buffer, contentType:String
        },
        dishName:{type:String, required: true},
        price:Number,
        preparationTime:String,
        rating:{
            currRating:Number,
            noOfRating:Number
        },
        currOrders:[
        {
           baseOrderSchema,
           expectedTime: { type: String, required: true }
        }
        ],
        history:[
            baseOrderSchema
        ]
    }]

})

export default canteenSchema;