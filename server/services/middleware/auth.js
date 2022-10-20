import jwt from "jsonwebtoken";

module.exports = function (req, res, next) {
    const token = req.cookies.jwt_token;
    if (!token) { 
        next();
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.PRIVATEKEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).send('Invalid token')
        }
    }
}
