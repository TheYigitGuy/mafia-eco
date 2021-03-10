const fs = require("fs");
const path = require("path");

module.exports = (client, Discord) => {
  const loadDir = (dirs) => {
    const eFiles = fs
      .readdirSync(path.join(__dirname, "..", "events", dirs))
      .filter((file) => file.endsWith(".js"));

    for (const file of eFiles) {
      const event = require(`../events/${dirs}/${file}`);
      const eventName = file.split(".")[0];

      client.events.set(eventName, event);
      client.on(eventName, event.bind(null, client, Discord));
    }
  };

  ["client", "guild"].forEach((dir) => {
    loadDir(dir);
  });
};
