import mongoose, { Schema, isObjectIdOrHexString, isValidObjectId }  from "mongoose";

const OrdersSchema= new Schema({
    userID:{type:Schema.Types.ObjectId},
    canteenID:{type:Schema.Types.ObjectId},
    itemName:{type:String},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },

});

export default OrdersSchema;