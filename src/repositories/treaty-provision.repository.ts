import {DefaultCrudRepository} from '@loopback/repository';
import {TreatyProvision, TreatyProvisionRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TreatyProvisionRepository extends DefaultCrudRepository<
  TreatyProvision,
  typeof TreatyProvision.prototype.id,
  TreatyProvisionRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(TreatyProvision, dataSource);
  }
}
