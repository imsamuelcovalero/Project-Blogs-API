module.exports = (sequelize, DataTypes) => {
  const PostCategorie = sequelize.define("PostCategorie", {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  }, {
    timestamps: false,
    underscored: false,
    tableName: 'PostCategories'
  });

  PostCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      through: PostCategorie,
      as: 'blogposts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Categorie, {
      through: PostCategorie,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }

  return PostCategorie;
};