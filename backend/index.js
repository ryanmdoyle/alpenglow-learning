const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
require('dotenv').config();

const UserSchema = require('./lists/User.js')
const PlaylistSchema = require('./lists/Playlist.js')
const ObjectiveSchema = require('./lists/Objective.js')

const PROJECT_NAME = "Alpineglow Learning API";

/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
});

keystone.createList('User', UserSchema);
keystone.createList('Playlist', PlaylistSchema);
keystone.createList('Objective', ObjectiveSchema);

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ enableDefaultRoute: true })],
};
