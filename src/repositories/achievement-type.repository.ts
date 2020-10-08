import {DefaultCrudRepository} from '@loopback/repository';
import {AchievementType, AchievementTypeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AchievementTypeRepository extends DefaultCrudRepository<
  AchievementType,
  typeof AchievementType.prototype.id,
  AchievementTypeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(AchievementType, dataSource);
  }
}
