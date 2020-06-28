import { Role } from './enums';
import User from './interfaces/User';

const hasPermission = (user: User, roles: Role): boolean => {
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

export default hasPermission;