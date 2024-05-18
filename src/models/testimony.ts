import { Date, Document, Model, Schema, model } from 'mongoose';

interface ITestimony extends Document {
    testyId: number;
    testimony: string;
    testyDate: Date;
    postedBy: number;
}


const testimonySchema: Schema = new Schema({
    postedBy: {
        type: Number,
        ref: "User",
        required: true
    },
    testyId: {
        type: Number,
        autoIncrement: true,
        required: true
    },
    testimony: {
        type: String,
        required: true
    },
    testyDate: {
        type: Date,
        required: true
    }
});


const Testimony: Model<ITestimony> = model<ITestimony>('Testimony', testimonySchema);

Testimony.find()
.populate("postedBy")
.then(testimonies => console.log(testimonies))
.catch(error=>console.log(error));


export { ITestimony, Testimony };