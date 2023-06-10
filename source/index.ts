import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-utilities-store/register';

import { PrismaClient } from '@prisma/client';
import { container } from '@sapphire/framework';
import { IntentsBitField } from 'discord.js';

import ExtendedSapphireClient from './client';
import ENV from './constants/env';

const sapphireClient = new ExtendedSapphireClient({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    /* ... */
  ],

  logger: {
    level: ENV.LOG_LEVEL,
  },

  baseUserDirectory: null,

  defaultPrefix: '!',
  caseInsensitiveCommands: true,
  caseInsensitivePrefixes: true,

  loadDefaultErrorListeners: true,
  loadMessageCommandListeners: true,
  loadApplicationCommandRegistriesStatusListeners: true,
});

// @ts-ignore The `prisma` property is not defined in the `Container` interface.
container.prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
  ],
});

container.prisma.$on('error', (event) => {
  container.logger.error('[PrismaClient at container.prisma]', event);
});

container.prisma.$on('info', (event) => {
  container.logger.info('[PrismaClient at container.prisma]', event);
});

container.prisma.$on('query', (event) => {
  container.logger.info('[PrismaClient at container.prisma]', event);
});

container.prisma.$on('warn', (event) => {
  container.logger.warn('[PrismaClient at container.prisma]', event);
});

async function run(): Promise<void> {
  await container.prisma.$connect();
  await sapphireClient.login(ENV.DISCORD_TOKEN);
}

if (require.main === module) {
  void run();
}
