import {DefaultCrudRepository} from '@loopback/repository';
import {OfferCommentLike, OfferCommentLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OfferCommentLikeRepository extends DefaultCrudRepository<
  OfferCommentLike,
  typeof OfferCommentLike.prototype.id,
  OfferCommentLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(OfferCommentLike, dataSource);
  }
}
