const mongoose = require('mongoose');
const express = require('express');
const userSchema = require("./models/User");
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

app.get('/user', (req, res) => {
    userSchema.find().then(d => {
        res.status(200).json(d);
    }).catch(err => next(err))
})

app.post('/user', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    userSchema.create({
        name: name,
        age: age
    }).then(d => {
        console.log(d);
        res.status(201).json({ message: "user created" })
    }).catch(err => {
        res.status(501).json({ error: err, msg: "Failed to create user" })
    })
})

app.put('/user/:userId', (req, res) => {
    let newData = {
        name: req.body.name,
        age: req.body.age
    }
    userSchema.findOneAndUpdate({ _id: req.params.userId }, newData, (err) => {
        if (err) {
            res.status(501).json({ error: err, success: false, msg: "Failed to update user" });
        }
        else {
            res.status(201).json({ success: true, msg: "user added" });
        }
    });
})

app.delete('/user/:userId', (req, res) => {
    userSchema.findByIdAndRemove(req.params.userId).then(d => {
        res.status(201).json({ success: true, msg: "user deleted" });
    }).catch(err => {
        res.status(501).json({ success: false, msg: "Failed to delete user" });
    })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})