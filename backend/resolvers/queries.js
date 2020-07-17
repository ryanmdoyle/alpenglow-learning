const verifyUser = require('../lib/verifyUser');

// Mongoose Models
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Playlist = require('../models/Playlist');
const Objective = require('../models/Objective');
const Request = require('../models/Request');
const Quiz = require('../models/Quiz');
const Score = require('../models/Score');

// currentUser data from JWT token available on context.currentUser
const queries = {
	async getCurrentUser(parent, args, context, info) {
		if (!context.currentUser) return null;
		if (!context.currentUser._id) return null;
		return await User.findById(context.currentUser._id);
	},

	async getUser(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await User.findOne({ _id: userId });
	},

	async getAllUsers(parent, args, context, info) {
		return await User.find();
	},

	async getInstructingClass(parent, args, context, info) {
		const { currentUser } = context;
		const aClass = await Class.findById(args.classId);
		if (aClass.primaryInstructor._id != currentUser._id) return ApolloError('Must be owner of class to view.')
		return aClass;
	},

	async getCourse(parent, args, context, info) {
		return await Course.findById(args.courseId);
	},

	async getInstructingStudents(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
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
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await Course.findOne({ owner: userId });
	},

	async getInstructingCourses(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await Course.find({ owner: userId });
	},

	async getEnrolledClasses(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await Class.find({ enrolled: { $in: userId } });
	},

	async getEnrolledCourses(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		const enrolledClasses = await Class.find({ enrolled: { $in: userId } }).select('_id');
		return await Course.find({ classes: { $in: enrolledClasses } });
	},

	async getInstructingClasses(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await Class.find({ primaryInstructor: userId });
	},

	async getPlaylist(parent, args, context, info) {
		if (!args.playlistId) return null;
		const playlist = await Playlist.findById(args.playlistId);
		return playlist;
	},

	async getPlaylistRequest(parent, args, context, info) {
		return await Request.findOne({ user: context.currentUser, playlist: args.playlistId });
	},

	async getRequests(parent, args, context, info) {
		const { currentUser } = context;
		// Create array of users classes they instruct
		let students = [];
		await Class.find({ primaryInstructor: currentUser._id }).select('enrolled').then(classes => {
			classes.forEach(instructingClass => {
				instructingClass.enrolled.forEach(student => students.push(student._id));
			})
		});
		// get all request for students you instruct
		return await Request.find({ user: { $in: students } });
	},

	async getQuizForPlaylist(parent, args, context, info) {
		return await Quiz.findOne({ playlist: args.playlistId })
	},

	async getScoresPending(parent, args, context, info) {
		const { currentUser } = context;
		// Create array of users classes they instruct
		let students = [];
		await Class.find({ primaryInstructor: currentUser._id }).select('enrolled').then(classes => {
			classes.forEach(instructingClass => {
				instructingClass.enrolled.forEach(student => students.push(student._id));
			})
		});
		const scores = await Score.find({
			$and: [
				{ user: { $in: students } },
				{
					$or: [
						{ score: null },
						{ possibleScore: null }
					]
				}
			]
		})
		return scores
	},

	async getScores(parent, args, context, info) {
		const { currentUser } = context;
		if (args.userId) {
			return await Score.find({ user: args.userId })
		}
		return await Score.find({ user: currentUser._id });
	},

	async getScoresForPlaylist(parent, args, context, info) {
		return await Score.find({ playlist: args.playlistId });
	},

	async getInstructingScores(parent, args, context, info) {
		const { currentUser } = context;
		// Create array of users classes they instruct
		let students = [];
		await Class.find({ primaryInstructor: currentUser._id }).select('enrolled').then(classes => {
			classes.forEach(instructingClass => {
				instructingClass.enrolled.forEach(student => students.push(student._id));
			})
		});
		const scores = await Score.find({
			$and: [
				{ user: { $in: students } },
				{
					$nor: [
						{ score: null },
						{ possibleScore: null }
					]
				}
			]
		})
		return scores
	},

	async getParentCourse(parent, args, context, info) {
		return await Course.findOne({ classes: { $in: { _id: args.classId } } });
	},

	async getScoresForClass(parent, args, context, info) {
		const parentCourse = await Course.findOne({ classes: { $in: { _id: args.classId } } });
		const playlists = [
			...parentCourse.essentialPlaylists,
			...parentCourse.corePlaylists,
			...parentCourse.challengePlaylists,
		];
		const playlistIds = playlists.map(playlist => playlist._id);
		return await Score.find({ playlist: { $in: playlistIds } });
	},

}

module.exports = queries;