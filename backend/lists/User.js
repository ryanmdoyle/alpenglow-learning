const { Text, Password, Select } = require('@keystonejs/fields');

module.exports = {
  fields: {
    firstName: {
      type: Text,
      isRequired: true,
    },
    lastName: {
      type: Text,
      isRequired: true,
    },
    fullName: {
      type: Text,
    },
    email: {
      type: Text,
      isRequired: true,
    },
    password: {
      type: Password,
      isRequired: true,
    },
    permissions: {
      type: Select,
      options: ['ADMIN', 'STUDENT', 'TEACHER'],
      defaultValue: 'USER',
    },
  }
}