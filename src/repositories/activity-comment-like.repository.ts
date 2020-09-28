import {DefaultCrudRepository} from '@loopback/repository';
import {ActivityCommentLike, ActivityCommentLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ActivityCommentLikeRepository extends DefaultCrudRepository<
  ActivityCommentLike,
  typeof ActivityCommentLike.prototype.id,
  ActivityCommentLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(ActivityCommentLike, dataSource);
  }
}
