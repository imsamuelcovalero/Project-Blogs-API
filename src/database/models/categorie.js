module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define("Categorie", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Categories'
  });

  return Categorie;
};