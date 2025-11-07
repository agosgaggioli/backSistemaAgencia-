// src/config/typeorm.ts
// src/config/typeorm.ts
import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const logging = (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true';
  const synchronize = (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true';
  const url = process.env.DATABASE_URL;

  const common = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize,
    logging,
    retryAttempts: 10,
    retryDelay: 3000,
    keepConnectionAlive: true,
  } as const;

  if (url) {
    return {
      type: 'postgres' as const,
      url,
      // ⚠️ Para URL, duplicar en ssl y extra.ssl
      ssl: true,
      extra: { ssl: { rejectUnauthorized: false } },
      ...common,
    };
  }

  // Fallback por campos individuales (dev/local)
  return {
    type: 'postgres' as const,
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    database: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    ssl: { rejectUnauthorized: false },
    extra: { ssl: { rejectUnauthorized: false } },
    ...common,
  };
});
