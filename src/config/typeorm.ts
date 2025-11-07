// src/config/typeorm.ts
import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const logging = (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true';
  const synchronize = (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true';
  const url = process.env.DATABASE_URL;

  const ca = process.env.RDS_CA_B64
    ? Buffer.from(process.env.RDS_CA_B64, 'base64').toString('utf8')
    : undefined;

  const common = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize,
    logging,
    ssl: ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: false },
    retryAttempts: 10,
    retryDelay: 3000,
    keepConnectionAlive: true,
  } as const;

  return url
    ? ({ type: 'postgres' as const, url, ...common })
    : ({
        type: 'postgres' as const,
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        database: process.env.DB_NAME!,
        username: process.env.DB_USERNAME!,
        password: process.env.DB_PASSWORD!,
        ...common,
      });
});
