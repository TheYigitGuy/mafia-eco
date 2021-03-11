const MafiaModel = require("../schemas/mafia");
const helpers = require("../utils/Economy");
const mongo = require("../utils/mongo");

module.exports = {
  run: {
    name: "withdraw",
    aliases: ["with", "wth"],
    async do(client, message, args) {
      if (!args[0])
        return message.reply(`Please specifiy an amount to withdraw.`);
      const amount = args[0];

      await mongo().then(async (mongoose) => {
        try {
          const success = await new helpers.Economy().withdraw(
            message.author.id,
            amount
          );
          if (success)
            return message.channel.send(
              `You withdrew ${amount.replace(
                "all",
                (await new helpers.Economy().viewBalance(message.author.id))
                  .secured
              )}$.\n See your new balance using \`maf.bal\``
            );
        } catch (e) {
          if (e.name == "ProfileError")
            return message.reply(
              "You dont have a profile yet, you can create one by using `maf.create`"
            );
          else if (e.name == "AmountError")
            return message.reply(`Don't even try to scam me.`);
          else return console.error(e);
        } finally {
          mongoose.connection.close();
        }
      });
    },
  },
  help: {
    desc: "Withdraw some money!",
    usage: "<amount>",
    examples: ["withdraw 2000"],
    category: "Economy",
  },
  config: {
    ownerOnly: false,
    enabled: true,
    cooldown: "30s",
    permissions: [],
  },
};
