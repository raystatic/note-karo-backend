const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth');
const userRoute = require('./routes/user');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true},
    () => console.log('connected to DB!')
);

app.use(express.json());


app.use('/apiV1/',authRouter);
app.use('/apiV1/user', userRoute);



app.listen(3000, () => console.log('server up and running'))