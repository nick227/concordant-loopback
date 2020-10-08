import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Activity, ActivityRelations, User, ActivityComment, ActivityEmotion} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {ActivityCommentRepository} from './activity-comment.repository';
import {ActivityEmotionRepository} from './activity-emotion.repository';

export class ActivityRepository extends DefaultCrudRepository<
  Activity,
  typeof Activity.prototype.id,
  ActivityRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Activity.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<ActivityComment, typeof Activity.prototype.id>;

  public readonly emotions: HasManyRepositoryFactory<ActivityEmotion, typeof Activity.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ActivityCommentRepository') protected activityCommentRepositoryGetter: Getter<ActivityCommentRepository>, @repository.getter('ActivityEmotionRepository') protected activityEmotionRepositoryGetter: Getter<ActivityEmotionRepository>,
  ) {
    super(Activity, dataSource);
    this.emotions = this.createHasManyRepositoryFactoryFor('emotions', activityEmotionRepositoryGetter,);
    this.registerInclusionResolver('emotions', this.emotions.inclusionResolver);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', activityCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
