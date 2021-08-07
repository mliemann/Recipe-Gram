const User = require("./User");
const Table = require("./Table");
const Category = require("./Category");

User.hasMany(Table, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Table.belongsTo(User, {
  foreignKey: "user_id",
});

Category.hasMany(Table, {
  foreignKey: "category_id",
});

Table.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Table,
  Category,
};
