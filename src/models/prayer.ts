import { Date, Document, Model, Schema, Types, model } from 'mongoose';

interface IPrayer extends Document {
    prayerReq: string;
    postDate: Date;
}


const prayerSchema: Schema = new Schema({
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