import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'concordant',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'concordant'
};
/* HEROKU SETTINGS 
const config = {
  name: 'concordant',
  connector: 'mysql',
  url: '',
  host: 'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'nue7ziqto836v7fu',
  password: 'rgm3l2hvlfojzwby',
  database: 'ug201y5gdut1hzgx'
};
*/

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConcordantDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'concordant';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.concordant', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
