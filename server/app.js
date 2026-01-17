require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectionDB = require("./config/connection");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call function
connectionDB();

app.use("/user", require("./routes/user"));
app.use("/blog", require("./routes/blog"))

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
