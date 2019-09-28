import { Listener } from 'discord-akairo';
import { logger } from '../../util/logger';

export default class ReadyListener extends Listener{
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        });
    }

    public async exec(): Promise<void> {
        logger.log(`Logged in as ${this.client.user!.tag}`, { colour: 'green' ,tag: 'LOGIN'});
        this.client.user!.setActivity(`@${this.client.user!.username} help`)
    }
}