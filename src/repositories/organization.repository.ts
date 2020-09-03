import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Organization, OrganizationRelations, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class OrganizationRepository extends DefaultCrudRepository<
  Organization,
  typeof Organization.prototype.id,
  OrganizationRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Organization.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Organization, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
