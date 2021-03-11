const profileModel = require("../schemas/mafia");
const enmap = require("enmap");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const OrganizationModel = require("../schemas/mafia");
const valids = require("../utils/countries.json");

module.exports = {
  run: {
    name: "create",
    aliases: ["start"],
    async do(client, message, args) {
      const filter = (m) => m.author.id == message.author.id;

      let profile = await OrganizationModel.findOne({
        ownerID: message.author.id,
      });

      if (profile) return message.reply(`You already have an organization.`);

      message.channel
        .send(
          new MessageEmbed({
            title: "Creating an Organization | Part 1",
            description:
              "Where do you want your headquarters to be? \n Answer with a country name! \n\n THIS WILL AFFECT YOUR PROGRESS",
            color: "RED",
            footer: "Mafia Bot v1.0.0",
          })
        )
        .then(async (m) => {
          m.channel
            .awaitMessages(filter, { max: 1, time: 60000, errors: ["Time"] })
            .then(async (collected) => {
              const author = collected.first().author;

              const resu = valids.filter(
                (obj) => obj.name == collected.first().content
              );

              if (!resu.length)
                return message.reply(
                  `No such country: ${collected.first().content}`
                );

              const newProfile = await OrganizationModel.create({
                ownerID: message.author.id,
                money: 10000,
                secured: 0,
                workers: 1,
                inventory: [],
                guns: ["AK-47"],
                hq: collected.first().content,
              });

              newProfile.save();

              message.channel.send(
                new MessageEmbed({
                  title: `Created Organization`,
                  description: `**Godfather** : <@${newProfile.ownerID}> \n **You Got:** \n +10K Money💵 \n +1 Worker 🙍‍♂️ \n +1 Starter Gun (AK-47) 🔫 `,
                })
              );
            })
            .catch((e) => message.channel.send(`You are out of time.`));
        });
    },
  },
  config: {
    ownerOnly: false,
    enabled: true,
    permissions: [],
    examples: [""],
    cooldown: "10s",
  },
  help: {
    desc: "Create a profile.",
    category: "Economy",
    usage: " ",
    examples: [`create`],
  },
};
