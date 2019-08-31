/*//? Handle Log Related Routes */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Log = require("../models/log");

//GET LOGS
router.get("/", (req, res, next) => {
  Log.find()
    .select("mealType date _id")
    .exec()
    .then(result => {
      const response = {
        count: result.length,
        logs: result.map(doc => {
          return {
            mealType: doc.mealType,
            dateLogged: doc.date,
            _id: doc._id
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
});

/* POST LOGS
{
  date: Date,
  mealType: Enum ["Breakfast", "Lunch", "Snack", "Dinner"]
}
*/
router.post("/", (req, res, next) => {
  console.log(req.file);
  const newLog = new Log({
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    mealType: req.body.mealType
  });
  newLog
    .save()
    .then(result => {
      console.log(result);
      if (result) {
        res.status(201).json({
          message: "Created Log Successfully",
          createdLog: {
            _id: new mongoose.Types.ObjectId(),
            date: req.body.date,
            mealType: req.body.mealType
          }
        });
      } else {
        res.status(404).json({
          message: "No Valid Entry Found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
/* 
// *Single Log

router.get("/:logID", (req, res, next) => {
  const id = req.params.logID;
  res.status(200).json({
    message: "Get By Id",
    id: id
  });
});

// ? PATCH AND DELETE

router.patch("/:logID", (req, res, next) => {
  const id = req.params.logID;
  res.status(200).json(response);
});

router.delete("/:logID", (req, res, next) => {
  const id = req.params.logID;
  res.status(200).json(response);
}); */
module.exports = router;
