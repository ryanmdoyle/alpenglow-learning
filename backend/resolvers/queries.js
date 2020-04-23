const verifyUser = require('../lib/verifyUser');

// Mongoose Models
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
	},

	async getEnrolledCourses(parent, args, context, info) {
		const verifiedUser = verifyUser(context);
		const user = await User.findById(verifiedUser._id).populate('enrolledCourses');
		return user.enrolledCourses;
	},

	async getTeachingCourses(parent, args, context, info) {
		const verifiedUser = verifyUser(context);
		const user = await User.findById(verifiedUser._id).populate('instructingCourses');
		return user.instructingCourses;
	},

	async getTeacherPlaylists(parent, args, context, info) {
		const verifiedUser = verifyUser(context);
		const user = await User.findById(verifiedUser._id).populate('instructingPlaylists');
	},

}

module.exports = queries;