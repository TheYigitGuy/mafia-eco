const { MessageEmbed } = require("discord.js");
const helpers = require("../utils/Economy");
const mongo = require("../utils/mongo");

module.exports = {
  run: {
    name: "company",
    aliases: ["comp", "c-info", "companyinfo"],
    async do(client, message, args) {
      await mongo().then((mongoose) => {
        try {
          const target = message.mentions.users.first() || message.author;
          new helpers.Economy().getCompany(target.id).then((company) => {
            let i = 0;

            function checkinline(e) {
              if (e % 2 == 0) {
                i++;

                return true;
              } else {
                i++;

                return false;
              }
            }

            return message.channel.send(
              new MessageEmbed({
                title: "Company Information",
                fields: [
                  {
                    name: "🌹 Godfather",
                    value: "*" + `<@${company.ownerID}>` + "*",
                    inline: checkinline(i),
                  },
                  {
                    name: "💰 Money",
                    value: company.money,
                    inline: checkinline(i),
                  },
                  {
                    name: "👮‍♂️ Secured",
                    value: company.secured,
                    inline: checkinline(i),
                  },
                  {
                    name: "🌍 Headquarters",
                    value: company.hq,
                    inline: checkinline(i),
                  },
                  {
                    name: "🏹 Guns",
                    value: company.guns[0].name,
                    inline: checkinline(i),
                  },
                  {
                    name: "🕵️‍♂️ Workers",
                    value: company.workers,
                    inline: checkinline(i),
                  },
                ],
              })
            );
          });
        } catch (e) {
          if (e.name == "ProfileError") {
            let text;
            message.mentions.users.first()
              ? (text =
                  "The target Does not have a company, one can be created using `maf.create`")
              : (text =
                  "You dont have a company yet, create one by using `maf.create`");
            return message.reply(text);
          } else console.error(e);
        }
      });
    },
  },
  help: {
    desc: "Get Information About Your Company",
    usage: " ",
    examples: ["company"],
    category: "Economy",
  },
  config: {
    ownerOnly: false,
    enabled: true,
    cooldown: "1 min",
    permissions: [],
  },
};
