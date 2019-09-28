import { CommandHandler, AkairoClient, ListenerHandler } from 'discord-akairo';
import { Message } from 'discord.js';
import { join } from 'path';
import { logger } from '../util/logger';

declare module 'discord-akairo' {
    interface ReiClient {
        commandHandler: CommandHandler;
        config: ReiOptions;
        logger: logger;
    }
}

interface ReiOptions{
    owner?: string;
    token?: string;
}

export default class ReiClient extends AkairoClient {
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'commands'),
        aliasReplacement: /-/g,
        prefix: (message: Message): string => '?',
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 3000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_, text): string => `${text}\n\nType \`cancel\` to cancel this command.`,
                modifyRetry: (_, text): string => `${text}\n\nType \`cancel\` to cancel this command.`,
                timeout: `Command has been cancelled, because you took too long.`,
                ended: `Too much retires, command ended.`,
                cancel: `Command has been cancelled.`,
                retries: 3,
                time: 30000
            }
        }
    });

    public listenerHandler = new ListenerHandler(this, {directory: join(__dirname, '..', 'listeners')});

    public config: ReiOptions;
    
    public logger: any = logger;

    public constructor(config: ReiOptions) {
        super({ ownerID: config.owner}, {
            messageCacheMaxSize: 50,
			messageCacheLifetime: 300,
			messageSweepInterval: 900,
            disableEveryone: true,
            fetchAllMembers: true,
			disabledEvents: ['TYPING_START'],
			partials: ['MESSAGE']
        });

        this.config = config;
    }

    private async load(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.loadAll()
        this.logger.log('Command handler loaded', {tag: 'CommandHandler'});
        this.listenerHandler.loadAll()
        this.logger.log('Listener handler loaded', {tag: 'ListenerHandler'});
    }

    public async start(): Promise<string> {
        await this.load();
        return this.login(this.config!.token)
    }
}