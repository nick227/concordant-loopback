import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Grievance, GrievanceRelations, User, GrievanceComment, Organization} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {GrievanceCommentRepository} from './grievance-comment.repository';
import {OrganizationRepository} from './organization.repository';

export class GrievanceRepository extends DefaultCrudRepository<
  Grievance,
  typeof Grievance.prototype.id,
  GrievanceRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Grievance.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<GrievanceComment, typeof Grievance.prototype.id>;

  public readonly organization: BelongsToAccessor<Organization, typeof Grievance.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('GrievanceCommentRepository') protected grievanceCommentRepositoryGetter: Getter<GrievanceCommentRepository>, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>,
  ) {
    super(Grievance, dataSource);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', grievanceCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
