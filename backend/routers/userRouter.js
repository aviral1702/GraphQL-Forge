const express = require("express");
const Model = require("../models/userModel");

const router = express.Router();

router.post("/add", (req, res) => {
  console.log(req.body);
  new Model(req.body)
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/getall", (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/authenticate", (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) res.status(200).json(result);
      else res.status(401).json({ status: "failed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/getbyemail", (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) res.status(200).json(result);
      else res.status(400).json({ status: "failed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
