const User = require('./User');
const Table = require('./Table');


Table.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Table, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Table
};