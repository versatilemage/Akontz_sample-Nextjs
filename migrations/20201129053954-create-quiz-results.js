'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('QuizResults', {
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('QuizResults');
    }
}
