require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectionDB = require("./config/connection");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call function
connectionDB();

app.use("/user", require("./routes/user"));
app.use("/blog", require("./routes/blog"))
app.use("/blogs", require("./routes/getData"))
// app.use("/users", require("./routes/getData"))

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
