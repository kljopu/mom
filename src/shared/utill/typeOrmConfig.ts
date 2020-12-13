import * as path from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// export const typeormConfig: MysqlConnectionOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'momsitter',
//   password: 'momsitter',
//   database: 'db_momsitter',
//   synchronize: true,
//   entities: [`${path.join(__dirname, '..', '..', '**')}/*.model.[tj]s`],
// };

export const typeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  port: 5432,
  username: 'momsitter',
  password: 'momsitter',
  database: 'momsitter',
  synchronize: true,
  entities: [`${path.join(__dirname, '..', '..', '**')}/*.model.[tj]s`],
  host: 'localhost',
};