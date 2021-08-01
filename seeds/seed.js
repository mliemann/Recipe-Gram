const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const projectData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
//Need to test
  for (const recipe of recipeData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};   

seedDatabase();