const axios = require("axios");
const fetch = require("node-fetch");

module.exports = {
  run: {
    name: "docs",
    aliases: ["doc", "documentation"],
    async do(client, message, args) {
      if (!args[0]) return message.reply(`Please specify what to search.`);
      const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
        args
      )}`;

      axios
        .get(url)
        .then((embed) => {
          const { data } = embed;

          if (data && !data.error) {
            message.channel.send({ embed: data });
          } else {
            message.reply(
              `Couldnt find anything like ${args[0]} in the documentation.`
            );
          }
        })
        .catch((e) => console.error(e));
    },
  },
  help: {
    desc: "View Discord.js (v12) Documentations!",
    category: "Information",
    usage: "<searchQuery>",
    examples: ["MessageEmbed"],
  },
  config: {
    enabled: true,
    permissions: [],
    ownerOnly: false,
    cooldown: "10s",
  },
};
