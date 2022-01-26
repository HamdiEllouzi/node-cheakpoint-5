const userSchema = require("../models/User");
exports.getUsers = (req, res) => {
    userSchema.find().then(d => {
        res.status(200).json(d);
    }).catch(err => next(err))
}

exports.creatUsers = (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    userSchema.create({
        ...req.body
    }).then(d => {
        console.log(d);
        res.status(201).json({ message: "user created" })
    }).catch(err => {
        res.status(501).json({ error: err, msg: "Failed to create user" })
    })
}

exports.updateUsers = (req, res) => {
    let newData = {
        name: req.body.name,
        age: req.body.age
    }
    userSchema.findOneAndUpdate({ _id: req.params.userId }, newData, (err) => {
        if (err) {
            res.status(501).json({ error: err, success: false, msg: "Failed to update user" });
        }
        else {
            res.status(201).json({ success: true, msg: "user updated" });
        }
    });
}

exports.deleteUsers = (req, res) => {
    userSchema.findByIdAndRemove(req.params.userId).then(d => {
        res.status(201).json({ success: true, msg: "user deleted" });
    }).catch(err => {
        res.status(501).json({ success: false, msg: "Failed to delete user" });
    })
}