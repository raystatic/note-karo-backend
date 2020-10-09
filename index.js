const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth');
const userRoute = require('./routes/user');
const notesRouter = require('./routes/notes');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    }
).then(
    () => {console.log('connected to DB!')},
    err => {console.log('error in connection: ',err)}
)

app.use(express.json());


app.use('/api/v1/',authRouter);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/notes', notesRouter);

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('Welcome to note-karo backend');
})



app.listen(process.env.PORT || 3000, () => console.log('server up and running'))