import { Date, Document, Model, Schema, model } from 'mongoose';

interface ITestimony extends Document {
    testyId: Number;
    testimony: string;
    testyDate: Date;
}


const testimonySchema: Schema = new Schema({
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

export { ITestimony, Testimony };