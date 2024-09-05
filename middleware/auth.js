const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken(req, res, next) {
    let tokenHeader = req.headers["x-access-token"];
    console.log("=>>>", tokenHeader);
    if (tokenHeader == "" || tokenHeader == undefined) {
      return res.status(400).send({
        errors: "Missing token",
        message: "Error",
        auth: false,
      });
    }

    if (tokenHeader.split(" ")[0] !== "Bearer") {
      return res.status(500).send({
        errors: "Incorrect token format",
        message: "Error",
        auth: false,
      });
    }

    let token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        auth: false,
        message: "Error",
        errors: "No token provided",
      });
    }

    jwt.verify(token, "supersecretkey", (err, decoded) => {
      console.log(decoded);
      if (err) {
        return res.status(500).send({
          auth: false,
          message: "Error",
          errors: err,
        });
      }
      req.userId = decoded.id;
      next();
    });
  },
};
