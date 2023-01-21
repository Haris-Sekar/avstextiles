import jwt from "jsonwebtoken";
import userModel from "../../models/auth.js";
export const auth = async function (req, res, next) {
  var token;
  if (!req.headers.authorization) {
    res.status(401).json({
      code: 401,
      message: "Unauthorized access",
    });
  } else {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.PRIVATEKEY);
      const fromDb = await userModel.findById(decoded.id);
      if (fromDb.email === decoded.email) {
        req.id = decoded.id;
        req.email = decoded.email;
        req.permission = fromDb.permission;
        req.userType = fromDb.userType;
      } else {
        res.status(401).json({
          code: 401,
          message: "Unauthorized access",
        });
      }
      next();
    } catch (error) {
      res.status(401).json({
        code: 401,
        message: "Unauthorized access",
      });
    }
  }
};
