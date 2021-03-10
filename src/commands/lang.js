module.exports = {
    run: {
      name: "language",
      aliases: ["lang", "lan"],
      async do(client, message, args) {
            client.langs.set(message.guild.id, "tr")
            return message.reply("Dil Başarıyla **Türkçe** Olarak Ayarlandı!")

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
        name: "lang",
        aliases: ["dil", "language"],
        async do(client, message, args) {
              client.langs.set(message.guild.id, "en")
              return message.reply("Language Successfully changed to **English**!")
  
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
      errors: {
        ownerOn: "Bu komut sadece geliştiriciler tarafından kullanılabilir.",
        cooldownE: "Biraz fazla hızlısın.",
        permError: "Bunu yapmaya yetkin yok.",
      }
    };