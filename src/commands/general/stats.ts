import * as Akairo from 'discord-akairo';
import { Message, MessageEmbed, version} from 'discord.js';
import * as moment from 'moment';
import 'moment-duration-format';


export default class StatsCommand extends Akairo.Command {
    public constructor() {
        super('stats', {
            aliases: ['stats'],
            category: 'general',
            description: { content: 'Show the bot statistics'},
            clientPermissions: ['EMBED_LINKS']
        });
    }

    public async exec(message: Message): Promise<Message | Message[] | void> {
        const embed = new MessageEmbed()
                .setColor('#ffb3b3')
                .setAuthor(`${this.client.user!.tag} ${this.client.uptime}`, this.client.user!.displayAvatarURL())
                .addField('Uptime 🕐', moment.duration(this.client.uptime!).format('d[d], h[h], m[m], s[s]'))
                .addField(
        'General', `
        \`\`\`css
- Server: ${this.client.guilds.size}
- Users: ${this.client.users.size}
- Channels: ${this.client.channels.size}\`\`\`
                `)
                .addField('Memory Usage', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB')
                .addField('Library', `[djs-${version}](https://discord.js.org/#/docs/main/master/general/welcome)`, true)
                .addField('Framework', `[discord-akairo-${Akairo.version}](https://discord-akairo.github.io/#/docs/main/8.0.0-beta.8/general/welcome)`, true)
                .setThumbnail(this.client.user!.displayAvatarURL())
                .setFooter(`Made by ${this.client.users!.get('216044883427852288')!.tag} with 💞`)
                .setTimestamp();

        return message.util!.send(embed);
    }
}