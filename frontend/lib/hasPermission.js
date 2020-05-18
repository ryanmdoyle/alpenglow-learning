const hasPermission = (user, roles) => {
  if (!user.permissions) return false;
  user.permissions.forEach(role => {
    if (roles.includes(role)) return true;
  })
  return false;
}

export default hasPermission;