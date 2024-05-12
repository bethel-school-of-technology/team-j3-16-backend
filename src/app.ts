import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import mongoose from 'mongoose';
import prayerRoutes from './routes/prayerRoutes';
import userRoutes from './routes/userRoutes';


const app = express();
const SERVER_PORT = 3000;

const connectionString: string = 'mongodb://localhost:27017/testDB';

mongoose.connect(connectionString).then(
    () => console.log('database connection successful!'), 
    err => console.log('Error connecting to the database', err));


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routes
app.use('/api/prayer', prayerRoutes);
app.use('/api/user', userRoutes);

app.use('/api/home', (req: any, res: any) => {
    res.json({ message: "Hello World" })

});

app.use((req: any, res: any, next: any) => {
    res.status(404).json({ message: "This is not the URL you are looking for!" })
});


app.listen(SERVER_PORT, () => {
    console.log("Server listening on port " + SERVER_PORT);
});
