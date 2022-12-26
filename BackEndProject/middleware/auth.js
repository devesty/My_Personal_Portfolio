import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token){
        return res.status(401).json({meaage: "a token is required for authentication"});
    }
    try {
        const tokenKey = process.env.TOKEN_KEY;
        const decodedToken = jwt.verify(token, tokenKey);
        req.user(decodedToken);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
    return next();
}

export default verifyToken;

