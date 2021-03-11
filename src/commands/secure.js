const MafiaModel = require("../schemas/mafia");

module.exports = {
  run: {
    name: "secure",
    aliases: ["deposit", "dep"],
    async do(client, message, args) {
      if (!args[0])
        return message.reply(`Please specifiy an amount to secure.`);

      const userProfile = await MafiaModel.findOne({
        ownerID: message.author.id,
      });

      if (!userProfile)
        return message.reply(
          "You dont have an organization yet, create one by using `maf.create` "
        );

      const amount = args[0].replace("all", userProfile.money);

      if (amount > userProfile.money)
        return message.reply(`Dont even try to scam me.`);

      await MafiaModel.findOneAndUpdate(
        {
          ownerID: message.author.id,
        },
        {
          $inc: {
            money: -amount,
            secured: amount,
          },
        }
      );

      return message.channel.send(
        `You deposited ${amount.replace(
          "all",
          userProfile.money
        )}$.\n See your new balance using \`maf.bal\``
      );
    },
  },
  help: {
    desc: "Secure your money to avoid being stolen from people.",
    usage: "<amount>",
    examples: ["secure 2000"],
    category: "Economy",
  },
  config: {
    cooldown: "30s",
    ownerOnly: false,
    enabled: true,
    permissions: [],
  },
};
