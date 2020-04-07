const User = require('../models/User');
const Courses = require('../models/Course');

const queries = {
	async currentUser(parent, args, context, info) {
		if (!context.userId) {
			return null;
		}
		const userQuery = await User.findById(context.userId);
		return userQuery;
	},

	async user(parent, args, context, info) {
		const _id = args._id;
		const user = await User.findOne({ _id: _id });
		return user;
	},

	async users(parent, args, context, info) {
		const users = await User.find();
		return users;
	},

	async getCourses(parent, args, context, info) {
		const courses = await Courses.find();
		return courses;
	}

}

module.exports = queries;