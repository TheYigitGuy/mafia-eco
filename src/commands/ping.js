const { MessageFlags } = require("discord.js");

module.exports = {
  run: {
    name: "ping",
    aliases: ["pong"],
    async do(client, message, args) {
      await message.channel.send("Pinging...").then((m) => {
        m.edit(
          `WebSocket Ping: ${client.ws.ping} \nMessage Edit Ping: ${
            m.createdTimestamp - message.createdTimestamp
          }`
        );
      });
    },
  },
  help: {
    desc: "Ping Command!",
    category: "Information",
    usage: " ",
    examples: [],
  },
  config: {
    enabled: true,
    permissions: [],
    ownerOnly: false,
    cooldown: "5s",
  },
};
