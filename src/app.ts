const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const requestsRoutes = require('./routes/requestsRoutes');
const bodyParser = require('body-parser');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
// const Database = require('./models/user');


// const db_url = "mongodb://localhost:27017/testDB";

// mongoose.connect(db_url, { useNewUrlParser: true });

// module.exports = mongoose;

const SERVER_PORT = process.env.PORT || 3000;
const SECRET_JWT_CODE = "finalProject2024";

const app = express();

app.use(bodyParser.json());



// const connectionString = 'mongodb://localhost:27017/testDB';

// mongoose.connect(connectionString).then(
//     () => console.log('database connection successful!'),
//     (err: any) => console.log('Error connecting to the database', err)
// );

// app.use(morgan('dev'));

// routes
// app.use('/api/requests', requestsRoutes);

app.use('/api/home', (req: any, res: any) => {
    res.json({ message: "Hello World" })

});

app.use((req: any, res: any, next: any) => {
    // res.status(404).render('error', {
    //     message: "This is not the URL you are looking for!"
    // });

    res.status(404).json({ message: "This is not the URL you are looking for!" })
});

// // MONGOOSE SIGNUP AUTH
// app.post("/api/user/signup", (req: any, res: any) => {
//     if (!req.body.username || !req.body.password || !req.body.city || !req.body.country) {
//         res.json({ success: false, error: "Send needed params" });
//         return;
//     }

//     Database.User.create({
//         username: req.body.username,
//         password: bcrypt.hashSync(req.body.password, 10),
//         city: req.body.city,
//         country: req.body.country,
//     }).then((user: any) => {
//         const token = jwt.sign(
//             { id: user._id, username: user.username, city: user.city, country: user.country },
//             SECRET_JWT_CODE
//         );
//         res.json({ success: true, token: token });
//     }).catch((err: any) => {
//         res.json({ success: false, error: err });
//     });
// });

// // MONGOOSE LOGIN AUTH
// app.post("/api/user/login", (req: any, res: any) => {
//     if (!req.body.username || !req.body.password) {
//         res.json({ success: false, error: "Send needed params" });
//         return;
//     }

//     Database.User.findOne({ username: req.body.username })
//         .then((user: any) => {
//             if (!user) {
//                 res.json({ success: false, error: "User does not exist" });
//             } else {
//                 if (!bcrypt.compareSync(req.body.password, user.password)) {
//                     res.json({ success: false, error: "Wrong password" });
//                 } else {
//                     const token = jwt.sign(
//                         { id: user._id, username: user.username },
//                         SECRET_JWT_CODE
//                     );
//                     res.json({ success: true, token: token });
//                 }
//             }
//         }).catch((err: any) => {
//             res.json({ success: false, error: err });
//         });
// });

// // MONGOOSE AUTH - CHECKING IF TOKEN IS VALID
// function fetchUserByToken(req: any) {
//     return new Promise((resolve: any, reject: any) => {
//         let authorization = req.headers.authorization;
//         if (authorization) {
//             let decoded: any;
//             try {
//                 decoded = jwt.verify(authorization, SECRET_JWT_CODE);
//             } catch (e) {
//                 reject("Token not valid");
//                 return;
//             }
//             let userId = decoded.id;
//             Database.User.findOne({ _id: userId })
//                 .then((user: any) => {
//                     resolve(user);
//                 })
//                 .catch((err: any) => {
//                     reject("Token error");
//                 });
//         } else {
//             reject("No token found");
//         }
//     });
// }




app.listen(SERVER_PORT, () => {
    console.log("Server listening on port " + SERVER_PORT);
});
