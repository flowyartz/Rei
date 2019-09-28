import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'p'],
            category: 'general',
            description: { content: 'Shows the connection of the bot.'}
        })
    }

    public async exec(message: Message): Promise<Message | Message[] | void> {
        const msg = await message.util!.send('Pinging...') as Message;
        return message.util!.send(`🏓! **Latency:** ${msg.createdTimestamp - message.createdTimestamp}ms, **API:** ${Math.round(this.client.ws.ping)}ms`)          
    }
}