import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {UserComment, UserCommentRelations, User, UserCommentLike} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {UserCommentLikeRepository} from './user-comment-like.repository';

export class UserCommentRepository extends DefaultCrudRepository<
  UserComment,
  typeof UserComment.prototype.id,
  UserCommentRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof UserComment.prototype.id>;

  public readonly likes: HasManyRepositoryFactory<UserCommentLike, typeof UserComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('UserCommentLikeRepository') protected userCommentLikeRepositoryGetter: Getter<UserCommentLikeRepository>,
  ) {
    super(UserComment, dataSource);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', userCommentLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
