// src/config/typeorm.ts
import { registerAs } from '@nestjs/config';
import { config as configDotenv } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  configDotenv({ path: '.env.development' });
}

export default registerAs('typeorm', () => ({
  type: 'postgres' as const,
  url: process.env.DATABASE_URL!,   // usamos la URL con sslmode=require
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true',
  logging: (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true',

  // Forzamos SSL por si el driver ignora el query param
  ssl: { rejectUnauthorized: false },
}));
