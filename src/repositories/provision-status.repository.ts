import {DefaultCrudRepository} from '@loopback/repository';
import {ProvisionStatus, ProvisionStatusRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProvisionStatusRepository extends DefaultCrudRepository<
  ProvisionStatus,
  typeof ProvisionStatus.prototype.id,
  ProvisionStatusRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(ProvisionStatus, dataSource);
  }
}
