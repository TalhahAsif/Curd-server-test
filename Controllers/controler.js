const userModel = require("../Modals/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  signup: async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    if ((!name || !email || !password || !phoneNumber)) {
      res.status(400).json({
        message: "requied field are empty",
      });
      return;
    }

    const dataTosend = {
      name,
      email,
      password: hashpassword,
      phone_number: phoneNumber,
    };

    userModel.findOne({ email }, (err, data) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
        });
      } else {
        if (data) {
          res.status(400).json({
            message: "Email is already exist",
          });
        } else {
          userModel.create(dataTosend, (err, data) => {
            if (err) {
              res.status(500).json({
                message: "Something went Wrong",
              });
            } else {
              res.status(200).json({
                message: "user Successfully signup",
                data: data,
                status: true,
              });
            }
          });
        }
      }
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);

    if (!email || !password) {
      res.status(400).json({
        message: "fill the required field",
      });
      return;
    }

    userModel.findOne({ email }, async (err, user) => {
      if (err) {
        res.status(500).json({
          message: "Something went Wrong",
        });
      } else {
        if (user) {
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          // console.log(isPasswordMatch);
          if (isPasswordMatch) {
            const tokenObj = {
              ...user,
            };
            const token = jwt.sign(tokenObj, process.env.JWT_TOKEN);
            res.status(200).json({
              message: "Successfully login",
              user: user,
              status: true,
              token,
            });
          } else {
            res.status(400).json({
              message: "credential error",
            });
          }
        } else {
          res.status(400).json({
            message: "credential error",
          });
        }
      }
    });
  },
  users: (req, res) => {
    userModel.find((err, user) => {
      if (err) {
        res.json({
          message: "Something Went Wrong",
        });
      } else {
        res.json({
          message: "User founded",
          user,
        });
      }
    });
  },
};



module.exports = authController;
