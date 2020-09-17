import {DefaultCrudRepository} from '@loopback/repository';
import {TreatyStatus, TreatyStatusRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TreatyStatusRepository extends DefaultCrudRepository<
  TreatyStatus,
  typeof TreatyStatus.prototype.id,
  TreatyStatusRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(TreatyStatus, dataSource);
  }
}
