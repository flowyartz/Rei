import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import fetch from 'node-fetch';
import * as qs from 'querystring';
import { logger } from '../../util/logger';

export default class DocsCommand extends Command {
    constructor() {
        super('docs', {
            aliases: ['docs'],
            category: 'docs',
            description: {
                content: 'Searches into discord.js documentation.',
                usage: '<query: required>',
                examples: ['ClientUser']
            },
            clientPermissions: ['EMBED_LINKS'],
            args: [{
                id: 'query',
                prompt: {
                    start: (message: Message): string => `${message.author}, what would you like to search?`,
                }
            }]
        });
    }

    public async exec(message: Message, {query}: {query: string}): Promise<Message | Message[] | void> {
        const q = query.split(' ');

        const queryString = qs.stringify({ src: 'master', q: q.join(' ') });
        const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?${queryString}`);
        try {
            const embed = await res.json();
        
            if (embed && !embed.error) {
                const msg = await message.util!.send({embed}) as Message;
                msg.react('🗑');
                    const collector = await msg.createReactionCollector((reaction, user) => reaction.emoji.name === '🗑' && user.id == message.author!.id, { time: 10000});
                    collector.on('collect', res => res.message.delete());
                    collector.on('end', res => { if (res.size <= 0) msg.reactions.removeAll()});
            } else message.util!.reply(`sorry I can't find ${q}`);
       } catch (e) {
           logger.error(e);
           message.util!.reply('Sorry im having problems..')
       }
    }
}