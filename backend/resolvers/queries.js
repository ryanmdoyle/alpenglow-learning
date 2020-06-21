const verifyUser = require('../lib/verifyUser');

// Mongoose Models
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Playlist = require('../models/Playlist');
const Objective = require('../models/Objective');
const Request = require('../models/Request');

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
		const classes = await Class.find({ primaryInstructor: userId });
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

	async getInstructingCourse(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		return await Course.findOne({ owner: userId });
	},

	async getInstructingCourses(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		return await Course.find({ owner: userId });
	},

	async getEnrolledClasses(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		return await Class.find({ enrolled: { $in: userId } });
	},

	async getEnrolledCourses(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		const user = await User.findById(userId);
		return await Course.find({ classes: { $in: user.enrolledClasses } });
	},

	async getInstructingClasses(parent, args, context, info) {
		const userId = args.user_id ? args.user_id : context.currentUser._id;
		return await Class.find({ primaryInstructor: userId });
	},

	async getPlaylist(parent, args, context, info) {
		if (!args.playlistId) return null;
		return await Playlist.findById(args.playlistId);
	},

	async getPlaylistRequest(parent, args, context, info) {
		return await Request.findOne({ user: context.currentUser, playlist: args.playlistId });
	},

	async getStudentRequests(parent, args, context, info) {
		const { currentUser } = context;
		// Create array of users classes they instruct
		let classList = [];
		await Class.find({ primaryInstructor: currentUser._id }).then(classes => {
			classes.forEach(clas => classList.push(clas._id))
		});
		// create list of students
		let studentList = [];
		await User.find({ enrolledClasses: { $in: classList } }).then(students => {
			students.forEach(student => studentList.push(student._id));
		})
		// get all request for students you instruct
		return await Request.find({ user: { $in: studentList } }).populate('user').populate('playlist');
	}

}

module.exports = queries;