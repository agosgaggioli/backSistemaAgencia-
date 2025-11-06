import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('typeorm', (): TypeOrmModuleOptions => {
  const url = process.env.DATABASE_URL;

  // 👉 Si hay DATABASE_URL (Render), SIEMPRE la uso
  if (url) {
    const isInternal =
      url.includes('.internal') || /\.internal(?::|\/|$)/.test(url);

    return {
      type: 'postgres',
      url, // interna: sin ssl ; externa: con ssl
      entities: ['dist/**/*.entity{.js,.ts}'],
      migrations: ['dist/migrations/*{.js,.ts}'],
      synchronize: false,
      logging: (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true',
      ...(isInternal
        ? { ssl: false }
        : {
            ssl: { rejectUnauthorized: false },
            extra: { ssl: { rejectUnauthorized: false } },
          }),
    };
  }

  // 👉 Fallback local por variables sueltas
  const useSSL = (process.env.DB_SSL ?? 'false').toLowerCase() === 'true';
  return {
    type: 'postgres',
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    database: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    entities: ['dist/**/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
    synchronize: (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true',
    logging: (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true',
    ssl: useSSL ? { rejectUnauthorized: false } : false,
    ...(useSSL ? { extra: { ssl: { rejectUnauthorized: false } } } : {}),
  };
});
