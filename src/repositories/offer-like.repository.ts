import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OfferLike, OfferLikeRelations, User, Organization} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {OrganizationRepository} from './organization.repository';

export class OfferLikeRepository extends DefaultCrudRepository<
  OfferLike,
  typeof OfferLike.prototype.id,
  OfferLikeRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof OfferLike.prototype.id>;

  public readonly organization: BelongsToAccessor<Organization, typeof OfferLike.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>,
  ) {
    super(OfferLike, dataSource);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
