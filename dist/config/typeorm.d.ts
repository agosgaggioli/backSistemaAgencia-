declare const _default: (() => {
    type: string;
    database: string;
    host: string;
    port: number;
    username: string | undefined;
    password: string | undefined;
    dropSchema: boolean;
    synchronize: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: number;
    username: string | undefined;
    password: string | undefined;
    dropSchema: boolean;
    synchronize: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
}>;
export default _default;
