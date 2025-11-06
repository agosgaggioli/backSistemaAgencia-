// src/config/typeorm.ts
import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    // Conexión por URL + sslmode=require (usa tu var de Render)
    return {
      type: 'postgres' as const,
      url: process.env.DATABASE_URL,          // ej: .../degradb?sslmode=require
      entities: ['dist/**/*.entity{.js,.ts}'],
      migrations: ['dist/migrations/*{.js,.ts}'],
      synchronize: false,
      logging: (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true',
      ssl: true,
      extra: { ssl: { rejectUnauthorized: false } }, // doble seguro
    };
  }

  // DEV (local)
  return {
    type: 'postgres' as const,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
    synchronize: (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true',
    logging: (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true',
    ssl: (process.env.DB_SSL ?? 'false').toLowerCase() === 'true' ? { rejectUnauthorized: false } : false,
  };
});
