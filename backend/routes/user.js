const router = require("express").Router();
let User = require("../models/user.model");

router.post("/add", async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
    });
    let result = await User.find({ email: req.body.email });
    if (!result.length) {
        try {
            let result = await newUser.save();
            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "databaseFailed" });
        }
    } else {
        res.json({ error: "The email already exist!" });
    }
});

router.post("/login", async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };
    try {
        let result = await User.find(user);
        if (!(result && result.length)) {
            res.json({ error: "User does not exist!" });
        } else {
            res.json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.post("/update", (req, res) => {
    User.updateMany({ _id: req.body.id }, { $set: { type: req.body.type, monthly_rental: req.body.monthly_rental } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});
module.exports = router;
