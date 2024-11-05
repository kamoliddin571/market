const { CustomError } = require("../lib/customError");

const { ROLES } = require("../consts/index");

class RoleMiddleware {
  checkRole(req, res, next) {
    try {
      const userRole = req.currentUser.role;
      if (!userRole) {
        throw new CustomError(403, "user role is required");
      }

      const roles = req[ROLES];

      if (roles && Array.isArray(roles)) {
        const isExist = roles.includes(userRole);

        if (!isExist) {
          throw new CustomError(
            403,
            `user role is not allowed and only ${roles.toString()} allowed`
          );
        }
      }

      next();
    } catch (error) {
      error.status = 403;
      next(error);
    }
  }
}

const roleMiddleware = new RoleMiddleware();

module.exports = { roleMiddleware };
