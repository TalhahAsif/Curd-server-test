const jwt = require("jsonwebtoken");

const middlewares = {
  authmiddleware: (req, res, next) => {
    // console.log(req.headers.authorization , "MIDDLEWARE");
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token, "try");
      const isValid = jwt.verify(token, process.env.JWT_TOKEN);
      console.log(isValid);
      if (isValid) {
        next();
      } else {
        res.status(400).json({
          message: "Please Login",
        });
      }
    } catch {
      res.status(400).json({
        message: "Please Login",
      });
    }
  },
};

module.exports = middlewares;
