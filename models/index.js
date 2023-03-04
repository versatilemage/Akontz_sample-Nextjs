'use strict';
// main model file
// const fs = require('fs');
import fs from "fs"
// const path = require('path');
import path from "path";
// const Sequelize = require('sequelize');
import Sequelize from "sequelize";
import Config from "../config/config.json"

// const config = require(__dirname + '/../config/config.json')[env];
// const basename = path.basename(__filename);
const db = {};
import User from './user'
// const User = require('./user')
import Course from './course'
// const Course = require('./course')
import Video from './video'
// const Video = require("./video")
import Enroled_courses from './enroled_courses'
// const Enroled_courses = require("./enroled_courses")
import Quiz from "./quiz";

import quizResults from "./quizResults";

const env = process.env.NODE_ENV || 'development';
const config = Config[env]

let sequelize;
console.log("config from index file", config)
// try {
//   if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable], config);
//   } else {
//     sequelize = new Sequelize(config.database, config.username, config.password, config);
//   }
// } catch (error) {
//   console.error('Unable to connect to the database:', error.message);
//   process.exit(1);
// }

try {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}catch (error) {
  console.log("error happening here:", error)
}


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = User(sequelize, Sequelize)
db.courses = Course(sequelize, Sequelize)
db.videos = Video(sequelize, Sequelize)
db.enroled_courses = Enroled_courses(sequelize, Sequelize)
db.quiz = Quiz(sequelize, Sequelize);
db.quizResults = quizResults(sequelize, Sequelize);

// hasMany relationshipt with user and course
db.users.hasMany(db.courses, { 
  as: 'courses',
  foreignKey: 'userId'
})
db.courses.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user'
})

// hasMany relationshipt with course and videos
db.courses.hasMany(db.videos, { 
  foreignKey: 'courseId',
  as: 'videos'
})
db.videos.belongsTo(db.courses, {
  foreignKey: 'courseId',
  as: 'course'
})

// hasMany relationshipt with user and videos
db.users.hasMany(db.videos, { 
  foreignKey: 'userId',
  as: 'videos'
})
db.videos.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user'
})

// hasMany relationshipt with course and enroled
db.courses.hasMany(db.enroled_courses, { 
  as: 'enroled_courses',
  foreignKey: 'courseId'
})
db.enroled_courses.belongsTo(db.courses, {
  foreignKey: 'courseId',
  as: 'course'
})

// hasMany relationshipt with user and enroled
db.users.hasMany(db.enroled_courses, { 
  as: 'enroled_courses',
  foreignKey: 'userId'
})
db.enroled_courses.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user'
})

// hasMany relationship with course and Quiz
db.courses.hasMany(db.quiz, {
  as: 'quiz',
  foreignKey: 'courseId',
});
db.quiz.belongsTo(db.courses, {
  foreignKey: 'courseId',
  as: 'course',
});

db.quizResults.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});
db.quizResults.belongsTo(db.courses, {
  foreignKey: 'courseId',
  as: 'course',
});
db.quizResults.belongsTo(db.quiz, {
  foreignKey: 'quizId',
  as: 'quiz',
});

// console.log('######', db)

module.exports = db;
