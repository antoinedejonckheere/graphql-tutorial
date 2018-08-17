module.exports = function PlaceModel(sequelize, DataTypes) {
  const Place = sequelize.define('place', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  });
  return Place
}