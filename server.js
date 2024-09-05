const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("./config/passport"); // Import passport configuration
const session = require("express-session");

const app = express();

const db = require("./models");

(async () => {
  try {
    await db.sequelize.sync();
    console.log("Database berhasil di-synchronize.");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
})();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to PaDi UMKM" });
});

require("./routes/product.route.js")(app);
require("./routes/auth.route.js")(app); // Include the auth routes

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
