import type { PrismaClient } from '@prisma/client';

/**
 * @internal Exposes the log events for the {@link PrismaClient}.
 */
type PrismaClientOptions = [
  {
    log: (
      | { emit: 'event'; level: 'error' }
      | { emit: 'event'; level: 'query' }
      | { emit: 'event'; level: 'info' }
      | { emit: 'event'; level: 'warn' }
    )[];
  },
  'info' | 'query' | 'warn' | 'error',
  false
];

declare module '@sapphire/pieces' {
  interface Container {
    readonly prisma: PrismaClient<
      PrismaClientOptions[0],
      PrismaClientOptions[1],
      PrismaClientOptions[2]
    >;
  }
}
