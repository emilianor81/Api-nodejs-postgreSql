
const { DataTypes  } = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define("article", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  title: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
  points: {
    type: DataTypes.INTEGER,
  },
  story_id: {
    type: DataTypes.INTEGER,
  },
  comment_text: {
    type: DataTypes.TEXT,
  },
  tags:{
    type: DataTypes.TEXT,
  },
});
}

