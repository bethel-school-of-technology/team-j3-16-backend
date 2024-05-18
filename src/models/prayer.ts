import mongoose, { Date, Document, Model, Schema, Types, model } from 'mongoose';

interface IPrayer extends Document {
    prayerId: number;
    prayerReq: string;
    postDate: Date;
    postedBy: number;
}


const prayerSchema: Schema = new Schema({
    postedBy: {
        type: Number,
        required: true,
        ref: "User"
        
    },
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

Prayer.find()
.populate("postedBy")
.then(prayers => console.log(prayers))
.catch(error=>console.log(error));

export { IPrayer, Prayer };
