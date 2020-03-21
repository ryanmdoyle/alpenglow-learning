const { Text, Relationship } = require('@keystonejs/fields');
const Objective = require('./Objective');

module.exports = {
  fields: {
    title: {
      type: Text,
      isRequired: true,
    },
    description: {
      type: Text,
      isRequired: true,
    },
    objectives: {
      type: Relationship,
      ref: 'Objective',
      many: true,
    }
  }
}
