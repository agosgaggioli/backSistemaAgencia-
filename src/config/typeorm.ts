// src/config/typeorm.ts
import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const logging =
    (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true';
  const synchronize =
    (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true';

  const url = process.env.DATABASE_URL;

  if (url) {
    // Preferimos URL completa (Render) con sslmode=require
    return {
      type: 'postgres' as const,
      url,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      synchronize,
      logging,
      // forzamos TLS igualmente
      ssl: { rejectUnauthorized: false },
      extra: { ssl: { rejectUnauthorized: false } },
    };
  }

  // Fallback a variables individuales (local/dev)
  return {
    type: 'postgres' as const,
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    database: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize,
    logging,
    ssl: { rejectUnauthorized: false },
    extra: { ssl: { rejectUnauthorized: false } },
  };
});
