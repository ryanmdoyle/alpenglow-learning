const verifyUser = require('../lib/verifyUser');

// Mongoose Models
const User = require('../models/User');
const Courses = require('../models/Course');

// currentUser data from JWT token available on context.user
const queries = {
	async getCurrentUser(parent, args, context, info) {
		const { user: { id } } = context;
		if (!id) {
			return null;
		}
		return await User.findById(id);
	},

	async getUser(parent, args, context, info) {
		return await User.findOne({ _id: args.user_id });
	},

	async getAllUsers(parent, args, context, info) {
		return await User.find();
	},

	async getEnrolledCourses(parent, args, context, info) {
		const user = await User.findById(context.user._id).populate('enrolledCourses');
		return user.enrolledCourses; // return only array of Courses
	},

	async getTeachingCourses(parent, args, context, info) {
		const user = User.findById(context.user._id).populate('instructingCourses');
		return user.instructinCourses; // return only array of Courses
	},

	async getEnrolledPlaylists(parent, args, context, info) {
		const user = await User.findById(context.user._id).populate('enrolledPlaylists');
		return user.enrolledPlaylists; // return only array of Playlists
	},

	async getTeachingPlaylists(parent, args, context, info) {
		const user = await User.findById(context.user._id).populate('teachingPlaylists');
		return user.teachingPlaylists; // return only array of Playlists
	},

}

module.exports = queries;