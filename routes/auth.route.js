const passport = require("passport");

module.exports = (app) => {
  const user = require("../controllers/auth.controller");

  let router = require("express").Router();

  // Registration
  router.post("/registration", user.create);

  // Login
  router.post("/login", user.login);

  // Google OAuth login
  router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

  // Callback URL setelah Google login
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    (req, res) => {
      // Generate JWT for Google users
      const token = jwt.sign(
        {
          id: req.user.id,
          username: req.user.username,
        },
        "supersecretkey",
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        message: "Success Login with Google!",
        code: 200,
        data: token,
      });
    }
  );

  app.use("/api/users", router);
};
