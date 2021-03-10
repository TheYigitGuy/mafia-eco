const profileModel = require("../schemas/mafia");
const enmap = require("enmap");
const ms = require("ms");

module.exports = {
  run: {
    name: "work",
    aliases: ["w"],
    async do(client, message, args) {
      let profiles = await profileModel.findOne({ ownerID: message.author.id });

      if (!profiles)
        return message.reply(
          "You dont have an organization yet, create one by using `maf.create` "
        );

      const randomNumb =
        profiles.workers * (Math.floor(Math.random() * 2501) + 500);

      const incr = await profileModel.findOneAndUpdate(
        {
          ownerID: message.author.id,
        },
        {
          $inc: {
            money: randomNumb,
          },
        }
      );

      message.channel.send(
        `Your workers did some work and earned: ${randomNumb}$`
      );
    },
  },
  config: {
    ownerOnly: false,
    enabled: true,
    permissions: [],
    cooldown: "30m",
  },
  help: {
    desc: "Work!",
    category: "Economy",
    usage: " ",
    examples: [""],
  },
};
