const fs = require("fs");
const path = require("path");

module.exports = (client, Discord) => {
  const cFiles = fs
    .readdirSync(path.join(__dirname, "..", "commands"))
    .filter((file) => file.endsWith(".js"));

  for (const file of cFiles) {
    const command = require(`../commands/${file}`);

    if (command.run.name && command.config.enabled) {
      client.commands.set(command.run.name, command);

      if (command.run.aliases && command.run.aliases.length) {
        command.run.aliases.map((alias) => {
          client.aliases.set(alias, command.run.name);
        });
      }

      if (!client.categories.includes(command.help.category))
        client.categories.push(command.help.category);
    }
  }
};
