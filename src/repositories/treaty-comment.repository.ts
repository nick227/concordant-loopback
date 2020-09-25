import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {TreatyComment, TreatyCommentRelations, User, TreatyCommentLike} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {TreatyCommentLikeRepository} from './treaty-comment-like.repository';

export class TreatyCommentRepository extends DefaultCrudRepository<
  TreatyComment,
  typeof TreatyComment.prototype.id,
  TreatyCommentRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof TreatyComment.prototype.id>;

  public readonly likes: HasManyRepositoryFactory<TreatyCommentLike, typeof TreatyComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('TreatyCommentLikeRepository') protected treatyCommentLikeRepositoryGetter: Getter<TreatyCommentLikeRepository>,
  ) {
    super(TreatyComment, dataSource);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', treatyCommentLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
