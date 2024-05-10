const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const prayerRoutes = require('./routes/prayerRoutes');
// const userRoutes = require('./routes/userRoutes');

import prayerRoutes from './routes/prayerRoutes';


const app = express();
const SERVER_PORT = process.env.PORT || 3000;

const connectionString: string = 'mongodb://localhost:27017/testDB';

mongoose.connect(connectionString).then(
    () => console.log('database connection successful!'), 
    err => console.log('Error connecting to the database', err));


app.use(morgan('dev'));
// const bodyParser = require('body-parser');
// mongoose.connect(db_url, { useNewUrlParser: true });
// app.use(bodyParser.json());


// routes
app.use('/api/prayer', prayerRoutes);
// app.use('/api/user', userRoutes);

app.use('/api/home', (req: any, res: any) => {
    res.json({ message: "Hello World" })

});

app.use((req: any, res: any, next: any) => {
    res.status(404).json({ message: "This is not the URL you are looking for!" })
});


app.listen(SERVER_PORT, () => {
    console.log("Server listening on port " + SERVER_PORT);
});
