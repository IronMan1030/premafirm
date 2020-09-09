const router = require("express").Router();
let Vehicle = require("../models/vehicle.model");

router.post("/", (req, res) => {
    Vehicle.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.status(400).json("Error:" + err));
});

// console.log("test");
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(
//   "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"
// );
// const msg = {
//   to: "minidolls1030@gmail.com",
//   from: "hyla526@hotmail.com",
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>"
// };
// sgMail.send(msg);

router.route("/add").post((req, res) => {
    const newVehicle = new Vehicle({
        modelID: req.body.modelID,
        type: req.body.type,
        image: req.body.image,
        monthly_rental: req.body.monthly_rental,
        initial_rental: req.body.initial_rental,
        engine_type: req.body.engine_type,
        engine_size: req.body.engine_size,
    });

    newVehicle
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.status(400).json("Error" + err));
});

router.route("/get-deals").post((req, res) => {
    const query = {
        type: req.body.type,
        modelID: req.body.modelID,
    };
    Vehicle.find(query)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).json("Error" + err);
        });
});

router.get("/delete/:id", (req, res) => {
    let delID = req.params.id;
    Vehicle.deleteOne({ _id: delID })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post("/update", (req, res) => {
    Vehicle.updateMany({ _id: req.body.id }, { $set: { type: req.body.type, monthly_rental: req.body.monthly_rental } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});
module.exports = router;
