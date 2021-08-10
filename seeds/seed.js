const sequelize = require("../config/config");
const { User, Table, Category } = require("../models");

const userData = require("./userData.json");
const tableData = require("./recipeData.json");
const catData = require("./catData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Category.bulkCreate(catData, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Table.bulkCreate(tableData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
