enum AlertStatus {
  Success = "SUCCESS",
  Error = "ERROR",
  None = "NONE",
}

enum PlaylistType {
  Essential = 'ESSENTIAL',
  Core = 'CORE',
  Challenge = 'CHALLENGE',
}

enum Role {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Admin = 'ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  Parent = 'PARENT',
}

export { AlertStatus, PlaylistType, Role }