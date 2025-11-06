"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: (origin, cb) => {
            if (!origin)
                return cb(null, true);
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
    await app.listen(parseInt(process.env.PORT ?? '3009', 10), '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map