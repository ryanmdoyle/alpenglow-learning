enum AlertStatus {
  Success = "SUCCESS",
  Error = "ERROR",
  None = "NONE",
}

enum Subjects {
  LanguageArts = 'Language Arts',
  Mathematics = 'Mathematics',
  History = 'History',
  Science = 'Science',
  VisualArts = 'Visual Arts',
  PerformingArts = 'Performing Arts',
  Technology = 'Technology',
  PhysicalEducation = 'Physical Education',
  ForeignLanguages = 'Foreign Languages',
  Elective = 'Elective',
}

enum PlaylistEnum {
  Essential = 'ESSENTIAL',
  Core = 'CORE',
  Challenge = 'CHALLENGE',
}

enum Roles {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Admin = 'ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
}

export { AlertStatus, Subjects, PlaylistEnum, Roles }