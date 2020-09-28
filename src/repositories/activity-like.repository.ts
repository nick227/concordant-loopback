import {DefaultCrudRepository} from '@loopback/repository';
import {ActivityLike, ActivityLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ActivityLikeRepository extends DefaultCrudRepository<
  ActivityLike,
  typeof ActivityLike.prototype.id,
  ActivityLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(ActivityLike, dataSource);
  }
}
