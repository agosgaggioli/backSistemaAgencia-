// src/config/typeorm.ts
import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => ({
  type: 'postgres' as const,

  // ⚠️ Nada de DATABASE_URL aquí. Campos individuales:
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  database: process.env.DB_NAME!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,

  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true',
  logging: (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true',

  // 🔒 Fuerza TLS (Render Postgres lo exige)
  ssl: { rejectUnauthorized: false },
}));
