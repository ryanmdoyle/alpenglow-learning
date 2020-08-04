const hasPermission = (user, roles) => {
  let hasPermission = false;
  if (user && user.roles) {
    user.roles.forEach(userRole => {
      if (roles.includes(userRole)) {
        hasPermission = true;
      }
    })
  } else {
    return false;
  }
  return hasPermission;
}

module.exports = hasPermission;