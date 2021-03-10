const { MessageEmbed } = require("discord.js");
const MafiaModel = require("../schemas/mafia");

module.exports = {
  run: {
    name: "balance",
    aliases: ["bal", "bl"],
    async do(client, message, args) {
        let target = message.mentions.users.first() || message.author
      let profiles = await MafiaModel.findOne({ ownerID: target.id });

      if (!profiles)
        return message.reply(
          "You or the target doesnt have an organization yet, A profile can be created using `maf.create` "
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

module.exports.tr = {


  run: {
    name: "bakiye",
    aliases: ["b", "bal"],
    async do(client, message, args) {
        let target = message.mentions.users.first() || message.author
      let profiles = await MafiaModel.findOne({ ownerID: target.id });

      if (!profiles)
        return message.reply(
          "Sen veya hedeflediğin kişinin bir profili yok, Bir profil `maf.basla` ile oluşturulabilir. "
        );

      const pEmbed = new MessageEmbed({
        title: "Bütçe",
        color: "RANDOM",
        fields: [
          {
            name: "Banka Bütçesi",
            value: `${profiles.money}$`,
            inline: true,
          },
          {
            name: "Güvende Bütçe",
            value: `${profiles.secured}$ `,
            inline: true,
          },
        ],
      });

      return message.channel.send(pEmbed);
    },
  },
  config: {
    enabled: true,
    ownerOnly: false,
    permissions: [],
    cooldown: "10s",
  },
  help: {
    desc: "Bütçenizi görün!",
    category: "Ekonomi",
    usage: " ",
    examples: [""],
  },
  errors: {
    ownerOn: "Bu komut sadece geliştiriciler tarafından kullanılabilir.",
    cooldownE: "Biraz fazla hızlısın.",
    permError: "Bunu yapmaya yetkin yok.",
  }
};


