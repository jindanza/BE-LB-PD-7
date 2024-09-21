const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
var hash = require("object-hash");

// registration
exports.create = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
      code: 400,
      data: null,
    });
  }

  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    phoneNumber: req.body.phoneNumber,
    referralCode: req.body.referralCode,
  };

  User.create(user)
    .then((data) => {
      res.status(200).send({
        message: "Add user Successfully",
        code: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the user.",
        code: 500,
        data: null,
      });
    });
};

// login
exports.login = (req, res) => {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  
    const user_payload = {
      username: req.body.username,
      password: req.body.password,
    };
  
    User.findOne({
      where: {
        username: user_payload.username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "Failed to login!",
            code: 404,
            data: null,
          });
        }
        const isPasswordValid = bcrypt.compareSync(
          user_payload.password,
          user.password
        );
        if (!isPasswordValid) {
          return res.status(401).send({
            message: "Failed to login!",
            code: 401,
            data: null,
          });
        }
  
        const token = jwt.sign(
          {
            username: user.username,
          },
          "supersecretkey",
          {
            expiresIn: 86400,
          }
        );
  
        res.status(200).send({
          message: "Success Login!",
          code: 200,
          data: {
            token: token,
            username: user.username
          },
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occured while creating the user.",
        });
      });
  };