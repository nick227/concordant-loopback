import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Conflict, ConflictRelations, Organization, Grievance, Offer} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrganizationRepository} from './organization.repository';
import {GrievanceRepository} from './grievance.repository';
import {OfferRepository} from './offer.repository';

export class ConflictRepository extends DefaultCrudRepository<
  Conflict,
  typeof Conflict.prototype.id,
  ConflictRelations
> {

  public readonly organization_a: BelongsToAccessor<Organization, typeof Conflict.prototype.id>;

  public readonly organization_b: BelongsToAccessor<Organization, typeof Conflict.prototype.id>;

  public readonly grievances: HasManyRepositoryFactory<Grievance, typeof Conflict.prototype.id>;

  public readonly offers: HasManyRepositoryFactory<Offer, typeof Conflict.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>, @repository.getter('GrievanceRepository') protected grievanceRepositoryGetter: Getter<GrievanceRepository>, @repository.getter('OfferRepository') protected offerRepositoryGetter: Getter<OfferRepository>,
  ) {
    super(Conflict, dataSource);
    this.offers = this.createHasManyRepositoryFactoryFor('offers', offerRepositoryGetter,);
    this.registerInclusionResolver('offers', this.offers.inclusionResolver);
    this.grievances = this.createHasManyRepositoryFactoryFor('grievances', grievanceRepositoryGetter,);
    this.registerInclusionResolver('grievances', this.grievances.inclusionResolver);
    this.organization_b = this.createBelongsToAccessorFor('organization_b', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization_b', this.organization_b.inclusionResolver);
    this.organization_a = this.createBelongsToAccessorFor('organization_a', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization_a', this.organization_a.inclusionResolver);
  }
}
