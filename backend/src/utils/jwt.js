const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        console.log("Token not found");
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err.message);
            return res.sendStatus(403);
        }
        req.user_id = data.id;
        next();
    });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    });

};

const generateToken = (id) => {
    return jwt.sign(
        { id: id },
        process.env.TOKEN_SECRET,
        { expiresIn: "30d" }
        //{ expiresIn: "30s" }
        //{ expiresIn: "30h" }
        //{ expiresIn: "30y" }
    );
};

module.exports = {
    authenticateToken,
    generateToken,
    verifyToken
};
