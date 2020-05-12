const verifyUser = require('../lib/verifyUser');

// Mongoose Models
const User = require('../models/User');
const Course = require('../models/Course');
const Playlist = require('../models/Playlist');
const Objective = require('../models/Objective');

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

	async getEnrolledCourses(parent, args, context, info) { //match to getInstructingCourses
		if (!args.user_id) {
			const currentUser = await User.findById(context.currentUser._id).populate('enrolledCourses');
			return currentUser.enrolledCourses; // return only array of Courses
		}
		const requestedUser = await User.findById(args.user_id).populate('enrolledCourses');
		return requestedUser.enrolledCourses;
	},

	async getInstructingCourses(parent, args, context, info) { //look up courses belonging to User
		const { currentUser } = context;
		if (!args.user_id) {
			return await Course.find({ owner: currentUser._id }).populate('playlists').populate('classes');
		}
		return await Course.find({ owner: args.user_id }).populate('playlists').populate('classes');
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

	async getInstructingPlaylists(parent, args, context, info) {
		if (!args.user_id) {
			const currentUser = await User.findById(context.currentUser._id).populate('instructingPlaylists');
			return currentUser.instructingPlaylists; // return only array of Courses
		}
		const requestedUser = await User.findById(args.user_id).populate('instructingPlaylists');
		return requestedUser.instructingPlaylists;
	},

	async getPlaylist(parent, args, context, info) {
		if (!args.playlistId) return "No Playlist ID provided";
		return await Playlist.findById(args.playlistId);
	}

}

module.exports = queries;