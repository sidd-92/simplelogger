/*//? Handle Log Related Routes */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Log = require("../models/log");
const moment = require("moment");

/*
Log Class
_id: mongoose.Schema.Types.ObjectId,
date: { type: Date, required: true, default: Date.now },
mealType: { type: String, required: true, default: "None" },
isBeverage: { type: Boolean, required: true, default: true },
totalResident: { type: Number, required: true, default: 0 },
totalGuest: { type: Number, required: true, default: 0 },
totalHD: { type: Number, required: true, default: 0 } 
*/
/*
POST Object Notation
{
  date: ,
  mealType: ,
  isBeverage: ,
  totalResident: ,
  totalGuest: ,
  totalHD: ,
}

*/

//GET LOGS
router.get("/", (req, res, next) => {
  Log.find()
    .select("-_v")
    .exec()
    .then(result => {
      const response = {
        count: result.length,
        logs: result.map(doc => {
          return {
            isBeverage: doc.isBeverage,
            totalResident: doc.totalResident,
            totalGuest: doc.totalGuest,
            totalHD: doc.totalHD,
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
//Get Data between Dates
router.get("/filterbydate", (req, res, next) => {
  let { startDate, endDate } = req.query;
  Log.find({
    date: { $lte: endDate, $gte: startDate }
  })
    .select("-_v")
    .exec()
    .then(result => {
      const response = {
        count: result.length,
        logs: result.map(doc => {
          return {
            isBeverage: doc.isBeverage,
            totalResident: doc.totalResident,
            totalGuest: doc.totalGuest,
            totalHD: doc.totalHD,
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
    mealType: req.body.mealType,
    isBeverage: req.body.isBeverage,
    totalResident: req.body.totalResident,
    totalGuest: req.body.totalGuest,
    totalHD: req.body.totalHD
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
            mealType: req.body.mealType,
            isBeverage: req.body.isBeverage,
            totalResident: req.body.totalResident,
            totalGuest: req.body.totalGuest,
            totalHD: req.body.totalHD
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
router.delete("/:logID", (req, res, next) => {
  const id = req.params.logID;
  Log.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Log Deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Given ID Not Available In DB",
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

 */
module.exports = router;
