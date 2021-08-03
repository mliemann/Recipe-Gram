const sequelize = require('../config/config');
const { User, Table } = require('../models');

const userData = require('./userData.json');
const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
//Need to test
  for (const recipe of recipeData) {
    await Table.create({
      ...recipe,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};   

seedDatabase();