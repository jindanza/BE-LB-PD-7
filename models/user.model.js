module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      referralCode: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    },
    {
      timestamp: true,
      tableName: "users",
    }
  );

  return User;
};