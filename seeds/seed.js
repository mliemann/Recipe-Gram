const sequelize = require('../config/config');
const { User, Table } = require('../models');

const userData = require('./userData.json');
const tableData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const table of tableData) {
    await Table.create({
      ...table,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
