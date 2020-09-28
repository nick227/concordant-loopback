import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {ActivityComment, ActivityCommentRelations, ActivityCommentLike, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ActivityCommentLikeRepository} from './activity-comment-like.repository';
import {UserRepository} from './user.repository';

export class ActivityCommentRepository extends DefaultCrudRepository<
  ActivityComment,
  typeof ActivityComment.prototype.id,
  ActivityCommentRelations
> {

  public readonly likes: HasManyRepositoryFactory<ActivityCommentLike, typeof ActivityComment.prototype.id>;

  public readonly creator: BelongsToAccessor<User, typeof ActivityComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('ActivityCommentLikeRepository') protected activityCommentLikeRepositoryGetter: Getter<ActivityCommentLikeRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(ActivityComment, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', activityCommentLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
  }
}
