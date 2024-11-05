const { ROLES } = require("../consts/index");

function setRoles(...roles) {
  return (req, res, next) => {
    req[ROLES] = roles;
    next();
  };
}

module.exports = { setRoles };
