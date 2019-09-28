import ReiClient from './client/ReiClient';
const client = new ReiClient({ owner: '216044883427852288', token: '' });

client.on('disconnect', () => client.logger.warn('Lost connection', {tag: 'DISCONNECTED'}))
    .on('reconnect', () => client.logger.info('Reconnecting..'))
    .on('error', (err) => client.logger.error(err))
    .on('warn', (warn) => client.logger.warn(warn))

client.start();