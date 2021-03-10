const mongo = require("mongoose");
const config = require("../../../config.json");

module.exports = async (client) => {
  console.log(`${client.user.tag} is online!`);
  await mongo
    .connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("MongoDB Connected");
    });
};
