const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const connectDB = require("./config/db");
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use("/api/logs", require("./routes/api/log"));

//Serve Static Assets in Production
if (process.env.NODE_ENV === "production") {
  //Set a Static Folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("http://localhost:5000");
});
