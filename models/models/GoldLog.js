const path = require("path");
const sequelize = require(path.resolve(__dirname, "../db"));
const Sequelize = require("sequelize");
const { STRING } = require("sequelize");
const Util = require(path.resolve(__dirname, "../util"));

class GoldLog extends Sequelize.Model {}
GoldLog.init(
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: Sequelize.BIGINT,
    content: Sequelize.STRING(128),
    description: Sequelize.TEXT(),
    uniqueString: Sequelize.STRING(128),
  },
  { sequelize, modelName: "goldlog" }
);

exports.pv = async () => {
  const now = new Date();
  const res = await GoldLog.create({
    timestamp: now.getTime(),
    content: now.toDateString(),
    uniqueString: "cow_year_pv",
  });
  return res;
};

exports.model = GoldLog;
