const { prefix, owners } = require("../../../config.json");
const ProfileModel = require("../../schemas/mafia");
const Discord = require("discord.js");
const enmap = require("enmap");
const ms = require("ms");

module.exports = async (client, Discord, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  if (command.config.ownerOnly && !owners.includes(message.author.id)) {
    return message.reply("This command can only be used by the developers.");
  }

  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  if (command.config.permissions.length) {
    if (typeof command.config.permissions === "string")
      command.config.permissions = [command.config.permissions];

    let invalidPerms = [];
    for (const permission of command.config.permissions) {
      if (!validPermissions.includes(permission)) {
        throw new SyntaxError(`Invalid Permission: ${permission}`);
      }
      if (!message.member.permissions.has(permission))
        invalidPerms.push(permission);
    }

    if (invalidPerms.length) {
      return message.reply(
        `Missing permissions: ${invalidPerms
          .map((perm) => `\`${perm}\``)
          .join(", ")}`
      );
    }
  }

  await client.cooldowns.ensure(`${message.author.id}-${command.run.name}`, 0);

  const time = Date.now();
  const cooldownAmount = ms(command.config.cooldown);
  const dbCooldown = client.cooldowns.get(
    `${message.author.id}-${command.run.name}`
  );

  if (dbCooldown > time && !owners.includes(message.author.id)) {
    return message.reply(
      `Please wait ${ms(dbCooldown - time, {
        long: true,
      })} before reusing the ${command.run.name} again.`
    );
  }

  client.cooldowns.set(
    `${message.author.id}-${command.run.name}`,
    Date.now() + cooldownAmount
  );

  await command.run.do(client, message, args);
};
