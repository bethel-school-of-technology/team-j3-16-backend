import { Date, Document, Model, Schema, Types, model } from 'mongoose';

interface IPrayer extends Document {
    prayerId: Number;
    prayerReq: string;
    postDate: Date;
}


const prayerSchema: Schema = new Schema({
    prayerId: {
        type: Number,
        autoIncrement: true,
        required: true
    },
    prayerReq: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        required: true
    }
});


const Prayer: Model<IPrayer> = model<IPrayer>('Prayer', prayerSchema);

export { IPrayer, Prayer };