const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./routers/users')

const app = express();
const port = process.env.PORT || "8000";

require('dotenv').config();

const url = process.env.ATLAS_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database connection successful');
}).catch(err => {
    console.error('Database connection error');
});

app.use(express.json());
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})