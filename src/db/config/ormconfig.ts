import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join, resolve } from "path";


const options: TypeOrmModuleOptions = {
    name: 'default',
    type: 'postgres',
    host: process.env.HOST || 'localhost',
    url: process.env.URI,
    database: process.env.DATABASE || 'transportdb',
    username: process.env.USER || 'postgres',
    port: parseInt(process.env.PORT || '5432'),
    password: process.env.PASSWORD || 'tecnologia',
    logging: true,
    entities: [resolve(__dirname, '..', 'entities', '*')],
    migrations: [resolve(__dirname, '..', 'migrations', '*')],
    synchronize: true,
    cli: {
        entitiesDir: join('src', 'db', 'entities'),
        migrationsDir: join('src', 'db', 'migrations'),
    }
}

module.exports = options;