'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Quiz', {
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
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Quiz');
  }
};