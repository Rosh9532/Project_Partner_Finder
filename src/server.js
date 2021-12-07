const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const app = express();
app.use(express.json());

//routes
const userRoutes = require("./routes/user");
app.use("/api", userRoutes);

//route,callback
// app.get("/", (req, res) => {
//   res.send("Welcome to the session");
// });

//mongodb connection
//hosturl,optional
mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

//port number, callback
app.listen(4000, console.log("Server is listening"));
