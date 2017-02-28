const commando = require('discord.js-commando');
const Discord = require('discord.js');

class UserInfoCommand extends commando.Command {
    constructor(Client){
        super(Client, {
            name: 'user', 
            group: 'userinfo',
            memberName: 'user',
            description: "Gives some info on a user. (;user @User)",
            examples: [";user @User"]
        });
    }

    async run(message, args) {
        if(message.channel.type !== 'dm') {
            if(!message.channel.permissionsFor(this.client.user).hasPermission('SEND_MESSAGES')) return;
            if(!message.channel.permissionsFor(this.client.user).hasPermission('READ_MESSAGES')) return;
            if(!message.channel.permissionsFor(this.client.user).hasPermission('EMBED_LINKS')) return;
        }
        if (message.channel.type === 'dm') {
            message.reply(":x: This is a DM!");
        } else {
            let member = message.guild.member(message.mentions.users.first());
            let stat;
            switch (message.mentions.users.first().presence.status) {
                case "online":
                stat = "<:vpOnline:212789758110334977> Online";
                break;
                case "idle":
                stat = "<:vpAway:212789859071426561> Idle";
                break;
                case "dnd":
                stat = "<:vpDnD:230093576355184640> Do Not Disturb";
                break;
                case "offline": 
                stat = "<:vpOffline:212790005943369728> Offline";
                break;
            }
            let color;
            switch (message.mentions.users.first().presence.status) {
                case "online":
                color = 0x00AE86;
                break;
                case "idle":
                color = 0xFFFF00;
                break;
                case "dnd":
                color = 0xFF0000;
                break;
                case "offline": 
                color = 0x808080;
                break;
            }
            if (message.mentions.users.size !== 1) {
                message.reply(':x: Either too many or no members, only mention one person!');
            } else {
                if (message.mentions.users.first().presence.game === null) {
                    const embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setThumbnail(message.mentions.users.first().avatarURL)
                    .addField('**Name:**',
                    message.mentions.users.first().username + '#' + message.mentions.users.first().discriminator, true)
                    .addField('**ID:**',
                    message.mentions.users.first().id, true)
                    .addField('**Joined Discord On:**',
                    message.mentions.users.first().createdAt, true)
                    .addField('**Joined Server On:**',
                    member.joinedAt, true)
                    .addField('**Status:**',
                    stat, true)
                    .addField('**Playing:**',
                    "None", true);
                    message.channel.sendEmbed(embed).catch(console.error);
                } else {
                    const embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setThumbnail(message.mentions.users.first().avatarURL)
                    .addField('**Name:**',
                    message.mentions.users.first().username + '#' + message.mentions.users.first().discriminator, true)
                    .addField('**ID:**',
                    message.mentions.users.first().id, true)
                    .addField('**Joined Discord On:**',
                    message.mentions.users.first().createdAt, true)
                    .addField('**Joined Server On:**',
                    member.joinedAt, true)
                    .addField('**Status:**',
                    stat, true)
                    .addField('**Playing:**',
                    message.mentions.users.first().presence.game.name, true);
                    message.channel.sendEmbed(embed).catch(console.error);
                }
            }
        }
    }
}

module.exports = UserInfoCommand;