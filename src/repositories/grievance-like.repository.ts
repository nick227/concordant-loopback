import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {GrievanceLike, GrievanceLikeRelations, User, Organization} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {OrganizationRepository} from './organization.repository';

export class GrievanceLikeRepository extends DefaultCrudRepository<
  GrievanceLike,
  typeof GrievanceLike.prototype.id,
  GrievanceLikeRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof GrievanceLike.prototype.id>;

  public readonly organization: BelongsToAccessor<Organization, typeof GrievanceLike.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>,
  ) {
    super(GrievanceLike, dataSource);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
