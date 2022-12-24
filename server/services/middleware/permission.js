import { checkRoutPermission } from "../../consts/permission.js";
export const permission = async (req, res, next) => {
  const result = checkRoutPermission(req.permission, req.baseUrl, req.route);
  console.log(result);
  if (result) next();
  else {
    res.status(401).json({
      code: 401,
      message: "Unauthorized access",
    });
  }
};
