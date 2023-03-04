'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class Quiz extends Model {

    };

    Quiz.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        quizzes: {
            type: Sequelize.ARRAY(Sequelize.JSONB)
        },
        totalTime: {
            type: Sequelize.FLOAT
        },
        courseName: {
            type: Sequelize.STRING
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
        userId: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            references: {
              model: 'Users',
              key: 'id',
              as: 'userId',
            }
          }
    }, {
        sequelize,
        modelName: 'Quizzes'
    });

    // const Quizzes = sequelize.define('Quizzes', {
    //     quizzes: {
    //         type: Sequelize.ARRAY(Sequelize.JSONB(Quiz))
    //     },
    //     totalTime: {
    //         type: Sequelize.FLOAT
    //     },
    //     courseId: {
    //         type: Sequelize.UUID,
    //         onDelete: 'CASCADE',
    //         references: {
    //           model: 'Courses',
    //           key: 'id',
    //           as: 'courseId',
    //         }
    //     },
    //     userId: {
    //         type: Sequelize.UUID,
    //         onDelete: 'CASCADE',
    //         references: {
    //           model: 'Users',
    //           key: 'id',
    //           as: 'userId',
    //         }
    //       },
    // });

    return Quiz;
};


