// src/config/typeorm.ts
import { registerAs } from "@nestjs/config";
import { config as configDotenv } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  configDotenv({ path: ".env.development" });
}

const useSSL = (process.env.DB_SSL ?? "false").toLowerCase() === "true";

export default registerAs("typeorm", () => ({
  type: "postgres" as const,
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT ?? "5432", 10),
  database: process.env.DB_NAME!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  synchronize: (process.env.DB_SYNCHRONIZE ?? "false").toLowerCase() === "true",
  logging: (process.env.DB_LOGGING ?? "false").toLowerCase() === "true",
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  ssl: useSSL ? { rejectUnauthorized: false } : false, // 🔑
}));

