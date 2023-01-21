import { checkRoutPermission } from "../../const/permission.js";
export const permission = async (req, res, next) => {
  const result = checkRoutPermission(req.permission, req.baseUrl, req.route,req);
  if (result.type) next();
  else {
    res.status(result.response.code).json( result.response );
  }
};
