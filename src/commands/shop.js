const MafiaModel = require("../schemas/mafia");
const shop = require("../../shop.json");

module.exports = {
  run: {
      name: "shop",
      aliases: ["sh"],
      async do(client,message,args) {
        
        const items =  shop.items.map((item) => {return `**${item.name}** \n${item.description} (${item.type})`}).join("\n");

        await message.channel.send(items + `**\n ${shop.worker.name}** \n${shop.worker.description} (Worker)`)
      }
  },
  help: {
      desc: "See the shop!",
      usage: " ",
      examples: ["shop"],
      category: "Economy"
  },
  config: {
      cooldown: "30s",
      ownerOnly: false,
      enabled: true,
      permissions: []
  },
};
