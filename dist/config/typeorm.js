"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('typeorm', () => {
    const logging = (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true';
    const synchronize = (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true';
    const url = process.env.DATABASE_URL;
    if (url) {
        return {
            type: 'postgres',
            url,
            entities: ['dist/**/*.entity{.ts,.js}'],
            migrations: ['dist/migrations/*{.ts,.js}'],
            synchronize,
            logging,
            ssl: { rejectUnauthorized: false },
            extra: { ssl: { rejectUnauthorized: false } },
        };
    }
    return {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        synchronize,
        logging,
        ssl: { rejectUnauthorized: false },
        extra: { ssl: { rejectUnauthorized: false } },
    };
});
//# sourceMappingURL=typeorm.js.map