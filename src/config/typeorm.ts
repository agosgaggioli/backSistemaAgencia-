// src/config/typeorm.ts
import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => ({
  type: 'postgres' as const,
  url: process.env.DATABASE_URL!,           // debe incluir ?ssl=true
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true',
  logging: (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true',
  ssl: { rejectUnauthorized: false },       // fuerza SSL por las dudas
}));

