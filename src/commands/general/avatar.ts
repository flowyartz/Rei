import { Command } from 'discord-akairo';
import { Message, MessageEmbed, GuildMember } from 'discord.js';

export default class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            category: 'general',
            description: {  content: 'Shows the user profile picture.' },
            clientPermissions: ['EMBED_LINKS'],
            args: [{
                id: 'member',
                type: 'member',
                    prompt: {
                        start: (message: Message): string => `${message.author}, what member's avatar do you want to see?`,
                        retry: (message: Message): string => `${message.author}, please mention a member.`
                    }
            }]
        })
    }

    public async exec(message: Message, {member}: {member: GuildMember}): Promise<Message | Message[] | void> {
        const embed = new MessageEmbed()
                .setColor('#ffb3b3')
                .setAuthor(member.user.tag)
                .setImage(member.user.displayAvatarURL({size: 2048}))
                .setFooter(`Took ${Math.round(this.client.ws.ping)}ms`)
        return message.util!.send(embed);
    }
}