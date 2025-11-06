declare const _default: (() => {
    type: "postgres";
    url: string;
    entities: string[];
    migrations: string[];
    synchronize: boolean;
    logging: boolean;
    ssl: {
        rejectUnauthorized: boolean;
    };
    extra: {
        ssl: {
            rejectUnauthorized: boolean;
        };
    };
    host?: undefined;
    port?: undefined;
    database?: undefined;
    username?: undefined;
    password?: undefined;
} | {
    type: "postgres";
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    entities: string[];
    migrations: string[];
    synchronize: boolean;
    logging: boolean;
    ssl: {
        rejectUnauthorized: boolean;
    };
    extra: {
        ssl: {
            rejectUnauthorized: boolean;
        };
    };
    url?: undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: "postgres";
    url: string;
    entities: string[];
    migrations: string[];
    synchronize: boolean;
    logging: boolean;
    ssl: {
        rejectUnauthorized: boolean;
    };
    extra: {
        ssl: {
            rejectUnauthorized: boolean;
        };
    };
    host?: undefined;
    port?: undefined;
    database?: undefined;
    username?: undefined;
    password?: undefined;
} | {
    type: "postgres";
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    entities: string[];
    migrations: string[];
    synchronize: boolean;
    logging: boolean;
    ssl: {
        rejectUnauthorized: boolean;
    };
    extra: {
        ssl: {
            rejectUnauthorized: boolean;
        };
    };
    url?: undefined;
}>;
export default _default;
