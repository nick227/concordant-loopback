import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProvisionComment, ProvisionCommentRelations, User, ProvisionCommentLike} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {ProvisionCommentLikeRepository} from './provision-comment-like.repository';

export class ProvisionCommentRepository extends DefaultCrudRepository<
  ProvisionComment,
  typeof ProvisionComment.prototype.id,
  ProvisionCommentRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof ProvisionComment.prototype.id>;

  public readonly likes: HasManyRepositoryFactory<ProvisionCommentLike, typeof ProvisionComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ProvisionCommentLikeRepository') protected provisionCommentLikeRepositoryGetter: Getter<ProvisionCommentLikeRepository>,
  ) {
    super(ProvisionComment, dataSource);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', provisionCommentLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
