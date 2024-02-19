const { Employee, Role } = require('../models/associations');

const verifyRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {

      const username = req.user;
      console.log(username);

      const employee = await Employee.findOne({
        where: { username: username },
        include: [{
          model: Role
        }]
      });

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      

      const roles = employee.Roles.map(role => role.name);
      const hasRequiredRole = roles.some(role => allowedRoles.includes(role));

      if (!hasRequiredRole) {
        return res.status(403).json({ message: "You do not have permission to perform this action" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = verifyRoles;
