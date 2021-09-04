import { join, resolve } from "path";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";




export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host:configService.get('DB_HOST'),
            username: configService.get('DB_USERNAME'),
            port:configService.get( 'DB_PORT'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            logging: true,
            entities: [resolve(__dirname, '..', 'entities', '*')],
            migrations: [resolve(__dirname, '..', 'migrations', '*')],
            synchronize: true,
            cli: {
                entitiesDir: join('src', 'db', 'entities'),
                migrationsDir: join('src', 'db', 'migrations'),
            }
        }
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService):
        Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService]


}