const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({"message": 'Username and password required'});
    //check for duplicate users in db
    const foundEmployee =  await Employee.findOne({ where: { username: username }});
    if (!foundEmployee) return res.sendStatus(404);

    const match = await bcrypt.compare(password, foundEmployee.password);
    if (match) {
        const accessToken = jwt.sign(
            { 
                "EmployeeInfo": {
                    "username": foundEmployee.username
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '120s' }
        )
        const refreshToken = jwt.sign(
            { "username": foundEmployee.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        foundEmployee.refreshToken = refreshToken;
        const result = await foundEmployee.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.status(401).json({"message": "Password do not match"});
    }
}

module.exports = {handleLogin};