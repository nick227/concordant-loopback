import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Vote, VoteRelations, User, Organization} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {OrganizationRepository} from './organization.repository';

export class VoteRepository extends DefaultCrudRepository<
  Vote,
  typeof Vote.prototype.id,
  VoteRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Vote.prototype.id>;

  public readonly organization: BelongsToAccessor<Organization, typeof Vote.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>,
  ) {
    super(Vote, dataSource);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
