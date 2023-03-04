'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class QuizResults extends Model {

    };

    QuizResults.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            references: {
              model: 'Users',
              key: 'id',
              as: 'userId',
            }
        },
        courseId: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            references: {
              model: 'Courses',
              key: 'id',
              as: 'courseId',
            }
        },
        quizId: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            references: {
              model: 'Quizzes',
              key: 'id',
              as: 'quizId',
            }
        },
        courseName: {
            type: Sequelize.STRING
        },
        totalMarks: {
            type: Sequelize.FLOAT
        },
    }, {
        sequelize,
        modelName: 'QuizResults'
    });

    return QuizResults;
}
