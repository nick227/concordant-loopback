import {DefaultCrudRepository} from '@loopback/repository';
import {OfferLike, OfferLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OfferLikeRepository extends DefaultCrudRepository<
  OfferLike,
  typeof OfferLike.prototype.id,
  OfferLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(OfferLike, dataSource);
  }
}
