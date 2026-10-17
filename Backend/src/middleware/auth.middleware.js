const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../schema/blacklist.schema");

const authUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Login or Register first"
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });
    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalidated . Log in again!"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

const requireRole = (allowedRoles) =>{
    return (req,res,next)=>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
        next();
    }
}

module.exports = { authUser ,requireRole };

