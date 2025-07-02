import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { TaskOrmEntity } from "../../task/infrastructure/persistance/task-typeorm.entity";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `localhost`,
    port: `5433`,
    username: `admin`,
    password: `Appex@oft121`,
    database: `admin`,
    entities: [TaskOrmEntity],
    migrations: [],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);