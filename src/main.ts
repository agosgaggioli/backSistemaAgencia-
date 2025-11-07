import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // permite herramientas/curl
      const allowed = [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
      ];
      return cb(null, allowed.includes(origin));
    },
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  if ((process.env.RUN_MIGRATIONS ?? 'false').toLowerCase() === 'true') {
    const ds = app.get(DataSource);
    console.log('[MIGRATIONS] Ejecutando migraciones pendientes…');
    await ds.runMigrations();
    console.log('[MIGRATIONS] OK');
  }

  await app.listen(parseInt(process.env.PORT ?? '3009', 10), '0.0.0.0');

}
bootstrap();
