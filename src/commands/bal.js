const { MessageEmbed } = require("discord.js");
const helpers = require("../utils/Economy");
const mongo = require("../utils/mongo");

module.exports = {
  run: {
    name: "balance",
    aliases: ["bal", "bl"],
    async do(client, message, args) {
      let target = message.mentions.users.first() || message.author;
      await mongo().then(async (mongoose) => {
        try {
          let profiles = await new helpers.Economy().viewBalance(
            message.author.id
          );

          const pEmbed = new MessageEmbed({
            title: "Organization Budget",
            color: "RANDOM",
            fields: [
              {
                name: "Your Coins",
                value: `${profiles.money}$`,
                inline: true,
              },
              {
                name: "Your secured",
                value: `${profiles.secured}$ `,
                inline: true,
              },
            ],
          });

          return message.channel.send(pEmbed);
        } catch (e) {
          if (e.name == "ProfileError")
            return message.reply(
              "You or the target does not have a profile yet, you / they can create one by using `maf.create`"
            );
          else console.error(e);
        } finally {
          mongoose.connection.close();
        }
      });
    },
  },
  config: {
    enabled: true,
    ownerOnly: false,
    permissions: [],
    cooldown: "10s",
    examples: [""],
    cooldown: "30s",
  },
  help: {
    desc: "View your balance!",
    category: "Economy",
    usage: " ",
  },
};
