import{join, resolve} from "path";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const options: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    port:3306,
    password: 'root',
    database: 'transportdb',
    logging: true,
    entities: [resolve(__dirname, '..', 'entities', '*')],
    migrations: [resolve(__dirname, '..', 'migrations', '*')],
    synchronize: true,
    cli:{
        entitiesDir:join('src', 'db', 'entities'),
        migrationsDir: join('src','db','migrations'),
    }
}

module.exports = options;