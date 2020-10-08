import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Organization, OrganizationRelations, User, UserToOrganization, OrganizationComment} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {UserToOrganizationRepository} from './user-to-organization.repository';
import {OrganizationCommentRepository} from './organization-comment.repository';

export class OrganizationRepository extends DefaultCrudRepository<
  Organization,
  typeof Organization.prototype.id,
  OrganizationRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Organization.prototype.id>;

  public readonly users: HasManyThroughRepositoryFactory<User, typeof User.prototype.id,
          UserToOrganization,
          typeof Organization.prototype.id
        >;

  public readonly comments: HasManyRepositoryFactory<OrganizationComment, typeof Organization.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, 
    @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, 
    @repository.getter('UserToOrganizationRepository') protected userToOrganizationRepositoryGetter: Getter<UserToOrganizationRepository>, 
    @repository.getter('OrganizationCommentRepository') protected organizationCommentRepositoryGetter: Getter<OrganizationCommentRepository>,
  ) {
    super(Organization, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', organizationCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.users = this.createHasManyThroughRepositoryFactoryFor('users', userRepositoryGetter, userToOrganizationRepositoryGetter,);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
