import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Offer, OfferRelations, User, OfferComment, Organization, OfferLike} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {OfferCommentRepository} from './offer-comment.repository';
import {OrganizationRepository} from './organization.repository';
import {OfferLikeRepository} from './offer-like.repository';

export class OfferRepository extends DefaultCrudRepository<
  Offer,
  typeof Offer.prototype.id,
  OfferRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Offer.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<OfferComment, typeof Offer.prototype.id>;

  public readonly organization: BelongsToAccessor<Organization, typeof Offer.prototype.id>;

  public readonly likes: HasManyRepositoryFactory<OfferLike, typeof Offer.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('OfferCommentRepository') protected offerCommentRepositoryGetter: Getter<OfferCommentRepository>, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>, @repository.getter('OfferLikeRepository') protected offerLikeRepositoryGetter: Getter<OfferLikeRepository>,
  ) {
    super(Offer, dataSource);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', offerLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', offerCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
