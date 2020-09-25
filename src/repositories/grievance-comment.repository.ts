import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {GrievanceComment, GrievanceCommentRelations, User, GrievanceCommentLike} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {GrievanceCommentLikeRepository} from './grievance-comment-like.repository';

export class GrievanceCommentRepository extends DefaultCrudRepository<
  GrievanceComment,
  typeof GrievanceComment.prototype.id,
  GrievanceCommentRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof GrievanceComment.prototype.id>;

  public readonly likes: HasManyRepositoryFactory<GrievanceCommentLike, typeof GrievanceComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('GrievanceCommentLikeRepository') protected grievanceCommentLikeRepositoryGetter: Getter<GrievanceCommentLikeRepository>,
  ) {
    super(GrievanceComment, dataSource);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', grievanceCommentLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
