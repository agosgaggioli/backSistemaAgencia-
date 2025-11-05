import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as configDotenv } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

configDotenv({ path: ".env.development" });

console.log(process.env.DB_PASSWORD)

const config = {
  type: "postgres",
  database: process.env.DB_NAME!,    
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT ?? "5432", 10), 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ,
  dropSchema: true,
  synchronize: true,
  logging: true,
  entities: ["dist/**/*.entity{.ts,.js}"], 
  migrations: ["dist/migrations/*{.ts,.js}"] 

};

export default registerAs("typeorm", () => config); // registro un servicio
