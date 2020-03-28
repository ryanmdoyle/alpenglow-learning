const User = require('../models/User');

const queries = {
  async currentUser(parent, args, context, info) {
    const userId = context.request.userId;
    // stuff here
  },

  async user(parent, args, context, info) {
    const _id = args._id;
    const user = await User.findOne({ _id: _id });
    return user;
  },

  async users(parent, args, context, info) {
    const users = await User.find()
    return users;
  },

  // async login(parent, { uuid }, context, into) {
  // const user = await User.find({ uuid: uuid })

  // ctx.res.cookie('token', token, {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 31,
  // });
  // return user;
  // }
}

module.exports = queries;