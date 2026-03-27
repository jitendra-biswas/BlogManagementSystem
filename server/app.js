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

// call function and then ensure default admin exists
(async () => {
  await connectionDB();

  // create default admin if not present
  try {
    const User = require("./model/user.model");
    const bcrypt = require("bcryptjs");

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@admin.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (!existing) {
      const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await User.create({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: hashed,
        handle: "@" + ADMIN_USERNAME,
        isAdmin: true
      });
      console.log("Default admin user created:", ADMIN_EMAIL);
    } else if (!existing.isAdmin) {
      // Update existing user to be admin if not already
      existing.isAdmin = true;
      await existing.save();
      console.log("Updated existing user to admin:", ADMIN_EMAIL);
    } else {
      console.log("Default admin already exists:", ADMIN_EMAIL);
    }
  } catch (err) {
    console.error("Failed to create default admin:", err.message || err);
  }

  app.use("/api/auth", require("./routes/user.routes.js"));
app.use("/api/auth",require('./routes/UpdateProfile.routes.js'))
app.use("/api/admin", require("./routes/admin.routes.js"))
app.use("/blog", require("./routes/blog.routes.js"))
app.use("/", require("./routes/getData.routes.js"))
app.use("/",require("./routes/comment.routes.js"))


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

})();
