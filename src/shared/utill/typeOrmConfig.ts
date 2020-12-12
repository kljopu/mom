import * as path from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export const typeormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'momsitter',
  password: 'momsitter',
  database: 'db_momsitter',
  synchronize: true,
  entities: [`${path.join(__dirname, '..', '..', '**')}/*.model.[tj]s`],
};
