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

app.use("/api/auth", require("./routes/user.routes.js"));
app.use("/blog", require("./routes/blog.routes.js"))
app.use("/", require("./routes/getData.routes.js"))
app.use("/",require("./routes/comment.routes.js"))

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
