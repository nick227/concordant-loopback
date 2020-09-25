import {DefaultCrudRepository} from '@loopback/repository';
import {TreatyCommentLike, TreatyCommentLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TreatyCommentLikeRepository extends DefaultCrudRepository<
  TreatyCommentLike,
  typeof TreatyCommentLike.prototype.id,
  TreatyCommentLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(TreatyCommentLike, dataSource);
  }
}
