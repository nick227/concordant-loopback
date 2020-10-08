import {DefaultCrudRepository} from '@loopback/repository';
import {ActivityEmotion, ActivityEmotionRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ActivityEmotionRepository extends DefaultCrudRepository<
  ActivityEmotion,
  typeof ActivityEmotion.prototype.id,
  ActivityEmotionRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(ActivityEmotion, dataSource);
  }
}
