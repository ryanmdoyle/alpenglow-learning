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
const Task = require('../models/Task');
const { ApolloError } = require('apollo-server-express');

const queries = {
	async getUserCurrent(parent, args, context, info) {
		if (!context.currentUser) return null;
		if (!context.currentUser._id) return null;
		return await User.findById(context.currentUser._id);
	},

	async getUser(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await User.findOne({ _id: userId });
	},

	async getClass(parent, args, context, info) {
		return await Class.findById(args.classId);
	},

	async getUsersAll(parent, args, context, info) {
		return await User.find();
	},

	async getClassInstructing(parent, args, context, info) {
		const { currentUser } = context;
		const aClass = await Class.findById(args.classId);
		if (aClass.primaryInstructor._id != currentUser._id) return ApolloError('Must be owner of class to view.')
		return aClass;
	},

	async getCourse(parent, args, context, info) {
		return await Course.findById(args.courseId);
	},

	async getUsersInstructing(parent, args, context, info) {
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

	async getCourseInstructing(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await Course.findOne({ owner: userId });
	},

	async getCoursesInstructing(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await Course.find({ owner: userId });
	},

	async getClassesEnrolled(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await Class.find({ enrolled: { $in: userId } });
	},

	async getCoursesEnrolled(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		const enrolledClasses = await Class.find({ enrolled: { $in: userId } }).select('_id course');
		const courseIds = enrolledClasses.map(clas => clas.course);
		return await Course.find({ _id: { $in: courseIds } });
	},

	async getClassesInstructing(parent, args, context, info) {
		const userId = args.userId ? args.userId : context.currentUser._id;
		return await Class.find({ primaryInstructor: userId });
	},

	async getPlaylist(parent, args, context, info) {
		if (!args.playlistId) return null;
		const playlist = await Playlist.findById(args.playlistId);
		return playlist;
	},

	async getRequest(parent, args, context, info) {
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

	async getScores(parent, args, context, info) {
		const { currentUser } = context;
		const query = {};
		if (args.userId) {
			query.user = args.userId;
		} else {
			query.user = currentUser._id;
		}
		return await Score.find(query);
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

	async getScoresForPlaylist(parent, args, context, info) {
		return await Score.find({ playlist: args.playlistId });
	},

	async getScoresInstructing(parent, args, context, info) {
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

	async getCourseOfClass(parent, args, context, info) {
		const clas = await Class.findById(args.classId);
		return await Course.findById(clas.course);
	},

	async getScoresForClass(parent, args, context, info) {
		const classForScores = await Class.findById(args.classId);
		const parentCourse = await Course.findById(classForScores.course);
		const playlists = [
			...parentCourse.essentialPlaylists,
			...parentCourse.corePlaylists,
			...parentCourse.challengePlaylists,
		];
		const playlistIds = playlists.map(playlist => playlist._id);
		return await Score.find({ playlist: { $in: playlistIds } });
	},

	async getScoresForEnrolledClass(parent, args, context, info) {
		const classForScores = await Class.findById(args.classId);
		const parentCourse = await Course.findById(classForScores.course);
		const playlists = [
			...parentCourse.essentialPlaylists,
			...parentCourse.corePlaylists,
			...parentCourse.challengePlaylists,
		];
		const playlistIds = playlists.map(playlist => playlist._id);
		return await Score.find({ playlist: { $in: playlistIds }, user: context.currentUser._id });
	},

	async getTasks(parent, args, context, info) {
		const { userId, playlistId, classId } = args;
		const query = {};
		if (!userId) query.user = context.currentUser._id;
		if (userId) query.user = userId;
		if (classId) query.class = classId;
		if (playlistId) query.playlist = playlistId;
		return await Task.find(query);
	},

	async getScorePendingOfEnrolledPlaylist(parent, args, context, info) {
		return await Score.findOne({ playlist: args.playlistId, user: context.currentUser._id, score: null });
	},
}
module.exports = queries;