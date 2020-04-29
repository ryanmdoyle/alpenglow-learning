const verifyUser = require('../lib/verifyUser');

// Mongoose Models
const User = require('../models/User');
const Courses = require('../models/Course');

// currentUser data from JWT token available on context.user
const queries = {
	async getCurrentUser(parent, args, context, info) {
		const { currentUser: { _id } } = context;
		if (!_id) {
			return null;
		}
		return await User.findById(_id);
	},

	async getUser(parent, args, context, info) {
		if (!args.user_id) return User.findOne({ _id: context.currentUser._id });
		return await User.findOne({ _id: args.currentUser._id });
	},

	async getAllUsers(parent, args, context, info) {
		return await User.find();
	},

	async getEnrolledCourses(parent, args, context, info) {
		if (!args.user_id) {
			const currentUser = await User.findById(context.currentUser._id).populate('enrolledCourses');
			return currentUser.enrolledCourses; // return only array of Courses
		}
		const requestedUser = await User.findById(args.user_id).populate('enrolledCourses');
		return requestedUser.enrolledCourses;
	},

	async getTeachingCourses(parent, args, context, info) {
		if (!args.user_id) {
			const currentUser = await User.findById(context.currentUser._id).populate('instructingCourses');
			return currentUser.instructingCourses; // return only array of Courses
		}
		const requestedUser = await User.findById(args.user_id).populate('instructingCourses');
		return requestedUser.instructingCourses;
	},

	// apply checking logic for current user above to queires below:
	async getEnrolledPlaylists(parent, args, context, info) {
		if (!args.user_id) {
			const currentUser = await User.findById(context.currentUser._id).populate('enrolledPlaylists');
			return currentUser.enrolledPlaylists; // return only array of Courses
		}
		const requestedUser = await User.findById(args.user_id).populate('enrolledPlaylists');
		return requestedUser.enrolledPlaylists;
	},

	async getTeachingPlaylists(parent, args, context, info) {
		if (!args.user_id) {
			const currentUser = await User.findById(context.currentUser._id).populate('teachingPlaylists');
			return currentUser.teachingPlaylists; // return only array of Courses
		}
		const requestedUser = await User.findById(args.user_id).populate('teachingPlaylists');
		return requestedUser.teachingPlaylists;
	},

}

module.exports = queries;