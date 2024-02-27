const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    //check for duplicate users in db
    const foundEmployee = await Employee.findOne({where: {refreshToken: refreshToken}});
    if (!foundEmployee) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundEmployee.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    "EmployeeInfo": {
                        "username": foundEmployee.username,
                        "id": foundEmployee.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s'}
            );
            res.json({accessToken});
        }
    )
}   

module.exports = { handleRefreshToken };