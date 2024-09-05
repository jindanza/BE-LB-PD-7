module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamp: true,
      tableName: "users",
    }
  );

  return User;
};