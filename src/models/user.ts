import mongoose, { Document, Model, model } from "mongoose";


interface IUser extends Document {
  userId: Number;
  username: string;
  password: string;
  city: string;
  country: string;

}

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    autoIncrement: true,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
}, 
  { collection: "users" }
);


const User: Model<IUser> = model<IUser>('User', userSchema);

export { IUser, User };


