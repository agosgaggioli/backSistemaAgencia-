import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

function buildAllowedOrigins() {
  const bases = new Set<string>([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
  ]);

  // FRONT_URL (una) o FRONT_URLS (coma-separadas)
  const one = (process.env.FRONT_URL || '').trim();
  if (one) bases.add(one);

  const many = (process.env.FRONT_URLS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  many.forEach(url => bases.add(url));

  return bases;
}

function isOriginAllowed(origin: string | undefined, allowlist: Set<string>) {
  if (!origin) return true; // curl, Postman, etc.

  // Coincidencia exacta con allowlist
  if (allowlist.has(origin)) return true;

  // Cualquier subdominio *.vercel.app (producción y previews)
  if (/^https?:\/\/([a-z0-9-]+\.)*vercel\.app$/i.test(origin)) return true;

  // Cualquier localhost con puerto típico de Vite
  if (/^https?:\/\/(localhost|127\.0\.0\.1):5(173|174)$/i.test(origin)) return true;

  return false;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowlist = buildAllowedOrigins();

  app.enableCors({
    origin: (origin, cb) => {
      const ok = isOriginAllowed(origin, allowlist);
      cb(null, ok);
    },
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  // Ejecutar migraciones en arranque si lo pedís por env
  if ((process.env.RUN_MIGRATIONS ?? 'false').toLowerCase() === 'true') {
    const ds = app.get(DataSource);
    console.log('[MIGRATIONS] Ejecutando migraciones pendientes…');
    await ds.runMigrations();
    console.log('[MIGRATIONS] OK');
  }

  const port = parseInt(process.env.PORT ?? '3009', 10);
  await app.listen(port, '0.0.0.0');
  console.log(`API escuchando en 0.0.0.0:${port}`);
}

bootstrap();
