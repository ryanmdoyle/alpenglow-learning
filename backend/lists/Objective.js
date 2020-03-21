const { Text, Relationship } = require('@keystonejs/fields');
const Playlist = require('./Playlist');

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
    playlist: {
      type: Relationship,
      ref: 'Playlist',
      many: true,
    }
  }
}