import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Activity, ActivityRelations, User, ActivityComment} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {ActivityCommentRepository} from './activity-comment.repository';

export class ActivityRepository extends DefaultCrudRepository<
  Activity,
  typeof Activity.prototype.id,
  ActivityRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Activity.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<ActivityComment, typeof Activity.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ActivityCommentRepository') protected activityCommentRepositoryGetter: Getter<ActivityCommentRepository>,
  ) {
    super(Activity, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', activityCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
