const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "REACTION"],
  ws: {
    properties: {
      $browser: "Discord iOS",
    },
  },
});

const config = require("../config.json");

const enmap = require("enmap");

client.events = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = [];
client.config = config;
client.owners = config.owners;
client.cooldowns = new enmap({
  name: "cooldowns xx",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep",
});

client.langs = new enmap({
  name: "Lang",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep",
});

["command", "event"].forEach((handler) => {
  const hd = require(`./handlers/${handler}`);
  hd(client, Discord);
});

client.login(config.token);
