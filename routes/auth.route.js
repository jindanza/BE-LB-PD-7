const passport = require("passport");
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  const user = require("../controllers/auth.controller");

  let router = require("express").Router();

  // Registration
  router.post("/registration", user.create);

  // Login
  router.post("/login", user.login);

  // Google OAuth login
  router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

  // Callback URL setelah Google login
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
      session: false,
    }),
    (req, res) => {
      const payload = { id: req.user.id, username: req.user.username };
      // Generate JWT for Google users
      const token = jwt.sign(payload, "supersecretkey", {expiresIn: '1h'});
      res.status(200).send({
        message: "Success Login with Google!",
        code: 200,
        data: {
          token: token,
          username: req.user.username,
        },
      });
    }
  );

  app.use("/api/users", router);
};
