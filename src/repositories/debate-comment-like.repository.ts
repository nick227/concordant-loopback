import {DefaultCrudRepository} from '@loopback/repository';
import {DebateCommentLike, DebateCommentLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DebateCommentLikeRepository extends DefaultCrudRepository<
  DebateCommentLike,
  typeof DebateCommentLike.prototype.id,
  DebateCommentLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(DebateCommentLike, dataSource);
  }
}
