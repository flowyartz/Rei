import { Command } from 'discord-akairo';
import { Message, MessageEmbed, version } from 'discord.js';

interface command {
    [key: string]: string;
}

const command_name: command = {
    docs: '📄\u2000Docs',
    general: '<:megumi:624247684181786625>\u2000General',
    mod: '📝\u2000Moderation',
    owner: '🔒\u2000Owner',
}

export default class HelpCommand extends Command {
    public constructor() {
        super('help', {
            aliases: ['help'],
            category: 'general',
            description: {
                content: 'Display a list of commands',
                usage: '[command: optional]'
            },
            clientPermissions: ['EMBED_LINKS'],
            args: [{
                id: 'command',
                type: 'commandAlias',
					prompt: {
						start: (message: Message): string => `${message.author}, Please provide the command you need help with.`,
						retry: (message: Message): string => `${message.author}, Invalid, please provide a valid command.`,
						optional: true
                    }
                }]
        });
    }

    public async exec(message: Message, {command}: {command: Command}): Promise<Message | Message[] | void> {
        if (!command) {
            const embed = new MessageEmbed()
                    .setColor('#ffb3b3')
                    .setAuthor(this.client.user!.username, this.client.user!.displayAvatarURL())
                    .setDescription(`You can use \`?help [command_name]\` for more detailed informations about a command.`)
                    .setImage('https://i.imgur.com/cBoiUvT.gif')
                    .setFooter(`v${version}`, this.client.user!.displayAvatarURL())
                    .setTimestamp();
            
            for (const category of this.handler.categories.values()) {
                embed.addField(command_name[category.id], `\`${category.map(cmd => cmd.aliases[0]).join(',` `')}\``)
            }
            return message.util!.send(embed);

        } else {
            const embed = new MessageEmbed()
                    .setColor('#ffb3b3')
                    .setAuthor(command.aliases[0], this.client.user!.displayAvatarURL())
                    .setFooter(`${Math.round(this.client.ws.ping)}ms ❤`)
                    .setTitle(`\`${command.aliases[0]} ${command.description.usage ? command.description.usage : ""}\``)
                    .addField('- Description', command.description.content ||  '\u200b');

            if (command.aliases.length > 1) {
                embed.addField('- Aliases', `\`${command.aliases.join(',` `')}\``, true);
            }
            if (command.description.examples && command.description.examples.length) {
                embed.addField('- Examples', `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``, true);
            }

            return message.util!.send(embed);
        }

    }
}