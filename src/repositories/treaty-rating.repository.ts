import {DefaultCrudRepository} from '@loopback/repository';
import {TreatyRating, TreatyRatingRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TreatyRatingRepository extends DefaultCrudRepository<
  TreatyRating,
  typeof TreatyRating.prototype.id,
  TreatyRatingRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(TreatyRating, dataSource);
  }
}
