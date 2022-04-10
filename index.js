const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// import routes
const posts = require("./routes/post");

// middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// middleware routes
app.use("/api/posts", posts);

// Base API
app.get("/", (req, res) => {
  res.send("Hello I am working");
});
app.get("/api", (req, res) => {
  res.send("Hello I am working");
});




// Connection with MongoDB atlas

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

  // mongoose.set('useFindAndModify', false);
  
// Running on port
// const PORT=process.env.PORT || 320;
// app.listen(PORT,()=>{
//     console.log(`Server running at http://localhost:${PORT}`);
// });

 // "proxy": "http://localhost:5000", main in nechay 