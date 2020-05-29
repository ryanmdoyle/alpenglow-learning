const verifyUser = require('../lib/verifyUser');

// Mongoose Models
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Playlist = require('../models/Playlist');
const Objective = require('../models/Objective');

// currentUser data from JWT token available on context.currentUser
const queries = {
	async getCurrentUser(parent, args, context, info) {
		const { currentUser: { _id } } = context;
		if (!_id) {
			return null;
		}
		return await User.findById(_id);
	},

	async getUser(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		return await User.findOne({ _id: userId });
	},

	async getAllUsers(parent, args, context, info) {
		return await User.find();
	},

	async getInstructingStudents(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		const classes = await Class.find({ primaryInstructor: userId }).populate('enrolled');
		// const students = classes.map(c => {
		// 	return c.enrolled;
		// })
		let students = [];
		classes.forEach(c => {
			for (let i = 0; i < c.enrolled.length; i++) {
				if (!students.includes(c.enrolled[i])) {
					students.push(c.enrolled[i]);
				}
			}
		})
		return students;
	},

	async getInstructingCourses(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		return await Course.find({ owner: userId }).populate('playlists').populate('classes');
	},

	async getEnrolledClasses(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		const user = await User.findById(userId).populate('enrolledClasses');
		return user.enrolledClasses;
	},

	async getInstructingClasses(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		return await Class.find({ primaryInstructor: userId }).populate('enrolled').populate('secondaryInstructors');
	},

	// apply checking logic for current user above to queires below:
	async getEnrolledPlaylists(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		const requestedUser = await User.findById(userId).populate('enrolledPlaylists');
		return requestedUser.enrolledPlaylists;
	},

	async getInstructingPlaylists(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		const requestedUser = await User.findById(userId).populate('instructingPlaylists');
		return requestedUser.instructingPlaylists;
	},

	async getPlaylist(parent, args, context, info) {
		if (!args.playlistId) return "No Playlist ID provided";
		return await Playlist.findById(args.playlistId);
	}

}

module.exports = queries;