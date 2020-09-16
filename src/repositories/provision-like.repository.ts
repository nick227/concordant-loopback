import {DefaultCrudRepository} from '@loopback/repository';
import {ProvisionLike, ProvisionLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProvisionLikeRepository extends DefaultCrudRepository<
  ProvisionLike,
  typeof ProvisionLike.prototype.id,
  ProvisionLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(ProvisionLike, dataSource);
  }
}
