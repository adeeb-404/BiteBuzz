import mongoose ,{Schema} from "mongoose";
const userSchema = new Schema({
    USN: {
      type: String,
      required: true,
      unique: true,
      match: /^4NI\d{2}[a-zA-Z]\d{3}$/,
    },
    Name: { type: String, required: true },
    emailID: { type: String, required: true, unique: true, lowercase: true },
    phoneNo: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    password: { type: String, required: true },
    orders: [
        [
      {
        userID: { type: Schema.Types.ObjectId },
        canteenID: { type: Schema.Types.ObjectId },
        itemName: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        expectedTime: { type: String, required: true },
      },
        ]
    ],
    history: [],
  });
  
  const User = mongoose.model('User', userSchema);
  
  export default User;
  