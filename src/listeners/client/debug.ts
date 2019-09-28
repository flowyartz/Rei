import { Listener } from 'discord-akairo';
import { logger } from '../../util/logger';

export default class DebugListener extends Listener {
    public constructor() {
        super('debug', {
            emitter: 'client',
            event: 'debug',
            category: 'client'
        });
    }

    public exec(event: any): void {
        logger.log(event, { tag: 'Debug' });
    }
}