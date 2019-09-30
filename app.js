const express = require("express");
const bodyParser = require("body-parser");
const logRoutes = require("./routes/api/log");
const morgan = require("morgan");
const app = express();
//app.use(cors());
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://sid:${process.env.MONGO_ATLAS_PWD}@logger-h8pc1.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false
  },
  function(err, client) {
    if (err) {
      console.log(err);
    }
    console.log("connected!!!");
  }
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/logs", logRoutes);
//Serve Static Assets in Production
if (process.env.NODE_ENV === "production") {
  //Set a Static Folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//! If the Routes comes past the above middleware
//! Then there is an Error, So all Error must be handled after the accepted routes

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: { message: error.message }
  });
});
module.exports = app;
