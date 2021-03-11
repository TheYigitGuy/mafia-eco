const mongo = require("mongoose");
const config = require("../../../config.json");

module.exports = async (client) => {
  console.log(`${client.user.tag} is online!`);
  await mongo.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  client.user.setPresence({
    activity: {
      name: `${client.commands.size} Commands!`,
      type: "STREAMING",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  })
};
