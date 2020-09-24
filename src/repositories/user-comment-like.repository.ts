import {DefaultCrudRepository} from '@loopback/repository';
import {UserCommentLike, UserCommentLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserCommentLikeRepository extends DefaultCrudRepository<
  UserCommentLike,
  typeof UserCommentLike.prototype.id,
  UserCommentLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(UserCommentLike, dataSource);
  }
}
