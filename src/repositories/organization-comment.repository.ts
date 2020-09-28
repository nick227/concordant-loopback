import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {OrganizationComment, OrganizationCommentRelations, OrganizationCommentLike, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrganizationCommentLikeRepository} from './organization-comment-like.repository';
import {UserRepository} from './user.repository';

export class OrganizationCommentRepository extends DefaultCrudRepository<
  OrganizationComment,
  typeof OrganizationComment.prototype.id,
  OrganizationCommentRelations
> {

  public readonly likes: HasManyRepositoryFactory<OrganizationCommentLike, typeof OrganizationComment.prototype.id>;

  public readonly creator: BelongsToAccessor<User, typeof OrganizationComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('OrganizationCommentLikeRepository') protected organizationCommentLikeRepositoryGetter: Getter<OrganizationCommentLikeRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(OrganizationComment, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', organizationCommentLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
  }
}
