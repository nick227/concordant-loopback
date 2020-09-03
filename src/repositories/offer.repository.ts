import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Offer, OfferRelations, User, OfferComment} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {OfferCommentRepository} from './offer-comment.repository';

export class OfferRepository extends DefaultCrudRepository<
  Offer,
  typeof Offer.prototype.id,
  OfferRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Offer.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<OfferComment, typeof Offer.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('OfferCommentRepository') protected offerCommentRepositoryGetter: Getter<OfferCommentRepository>,
  ) {
    super(Offer, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', offerCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
