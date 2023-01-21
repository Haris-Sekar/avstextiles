import { checkRoutPermission } from "../../const/permission.js";
export const permission = async (req, res, next) => {
  const result = checkRoutPermission(req.permission, req.baseUrl, req.route,req);
  if (result) next();
  else {
    res.status(401).json({
      code: 401,
      message: "Unauthorized access",
    });
  }
};
