import { z } from 'zod';

import { JwtSchema, LogLevelSchema, PrismaURLSchema } from './schemas';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),

  DISCORD_TOKEN: JwtSchema,
  DATABASE_URL: PrismaURLSchema,

  LOG_LEVEL: LogLevelSchema,
});

// `process.env.NODE_ENV` is set by tsup at build time but it
// also allows for the environment variable to be set manually.
const ENV = EnvSchema.parse({
  ...process.env,
  NODE_ENV: process.env.NODE_ENV,
});

export type Env = z.infer<typeof EnvSchema>;
export const __DEV__ = process.env.NODE_ENV === 'development';

export default ENV;
