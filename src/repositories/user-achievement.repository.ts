import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {UserAchievement, UserAchievementRelations, AchievementType} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AchievementTypeRepository} from './achievement-type.repository';

export class UserAchievementRepository extends DefaultCrudRepository<
  UserAchievement,
  typeof UserAchievement.prototype.id,
  UserAchievementRelations
> {

  public readonly type: BelongsToAccessor<AchievementType, typeof UserAchievement.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('AchievementTypeRepository') protected achievementTypeRepositoryGetter: Getter<AchievementTypeRepository>,
  ) {
    super(UserAchievement, dataSource);
    this.type = this.createBelongsToAccessorFor('type', achievementTypeRepositoryGetter,);
    this.registerInclusionResolver('type', this.type.inclusionResolver);
  }
}
