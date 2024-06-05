import mongoose, { Document, Model, model } from "mongoose";


interface IUser extends Document {
  userId: number;
  username: string;
  password: string;
  place:string
  region: string;
  country: string;

}

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
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
  place: {
    type: String,
    required: true
  },
  region: {
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


