import mongoose, { Schema }  from "mongoose";

const OrdersSchema= new Schema({
    Name: { type: String, required: true },
    USN: { type: String, required: true },
    Quantity: { type: Number, required: true },
    DishName: { type: String, required: true },
    price: { type: Number, required: true },
},{_id:false});

export default OrdersSchema;