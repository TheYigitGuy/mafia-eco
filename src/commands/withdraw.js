const MafiaModel = require("../schemas/mafia");

module.exports = {
    run: {
        name: "withdraw",
        aliases: ["with", "wth"],
        async do(client,message,args) {
            if(!args[0]) return message.reply(`Please specifiy an amount to withdraw.`);

            const userProfile = await MafiaModel.findOne({ownerID: message.author.id});
  
            if(!userProfile) return message.reply("You dont have an organization yet, create one by using `maf.create` ")
  
            const amount = args[0].replace("all", userProfile.secured);
  
            if(amount > userProfile.secured) return message.reply(`Dont even try to scam me.`)
  
            await MafiaModel.findOneAndUpdate({
                ownerID: message.author.id
            },
              {
                  $inc: {
                      money: amount,
                      secured: -amount
                  }
              }
            )
  
            return message.channel.send(`You withdrew ${amount}$.\n See your new balance using \`maf.bal\``)
        }
    },
    help: {
        desc: "Withdraw some money!",
        usage: "<amount>",
        examples : ["withdraw 2000"],
        category: "Economy"
    },
    config: {
        ownerOnly: false,
        enabled: true,
        cooldown: "30s",
        permissions: []
    }
}