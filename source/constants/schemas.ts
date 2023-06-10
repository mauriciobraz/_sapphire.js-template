import { LogLevel } from '@sapphire/framework';
import { z } from 'zod';

/**
 * @internal A map of {@link LogLevel} string representations to their corresponding {@link LogLevel} value.
 */
const LOG_LEVELS_MAP = {
  Trace: LogLevel.Trace,
  Debug: LogLevel.Debug,
  Info: LogLevel.Info,
  Warn: LogLevel.Warn,
  Error: LogLevel.Error,
  Fatal: LogLevel.Fatal,
  None: LogLevel.None,
  '10': LogLevel.Trace,
  '20': LogLevel.Debug,
  '30': LogLevel.Info,
  '40': LogLevel.Warn,
  '50': LogLevel.Error,
  '60': LogLevel.Fatal,
  '100': LogLevel.None,
};

/**
 * @internal The keys of {@link LOG_LEVELS_MAP}.
 */
type LogLevelKeys = keyof typeof LOG_LEVELS_MAP;

/**
 * A schema for a valid JWT token (format: 24 characters, 6 characters, 27 characters).
 */
export const JwtSchema = z
  .string()
  .regex(
    /^[\w-]{24}\.[\w-]{6}\.[\w-]{27}$/,
    'Should be a valid JWT token (24 characters, 6 characters, 27 characters)'
  );

/**
 * A schema for a valid Prisma URL (format: `protocol://user:password@host:port/database`).
 * Supported protocols: `postgresql`, `mysql`, `sqlite`, `mongodb`, `mssql`, and `cockroachdb`.
 */
export const PrismaURLSchema = z
  .string()
  .regex(
    /^(postgresql|mysql|sqlite|mongodb|mssql|cockroachdb):\/\/[\w-]+:[\w-]+@[\w-]+:\d+\/[\w-]+$/,
    'Should be a valid Prisma URL'
  );

/**
 * A schema for a valid {@link LogLevel}.
 * Maps the string representation to the corresponding {@link LogLevel} value.
 */
export const LogLevelSchema = z
  .enum(Object.keys(LOG_LEVELS_MAP) as [LogLevelKeys, ...LogLevelKeys[]])
  .transform((value) => {
    return LOG_LEVELS_MAP[value];
  });
