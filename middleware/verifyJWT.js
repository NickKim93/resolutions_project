const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(403);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.sendStatus(401);
                } else {
                    return res.sendStatus(403);
                }
            }
            req.user = decoded.EmployeeInfo.username;
            req.employeeId = decoded.EmployeeInfo.id;
            next();
        }
        
    )
}

module.exports = verifyJWT;