import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {OfferComment, OfferCommentRelations, User, OfferCommentLike} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {OfferCommentLikeRepository} from './offer-comment-like.repository';

export class OfferCommentRepository extends DefaultCrudRepository<
  OfferComment,
  typeof OfferComment.prototype.id,
  OfferCommentRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof OfferComment.prototype.id>;

  public readonly likes: HasManyRepositoryFactory<OfferCommentLike, typeof OfferComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('OfferCommentLikeRepository') protected offerCommentLikeRepositoryGetter: Getter<OfferCommentLikeRepository>,
  ) {
    super(OfferComment, dataSource);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', offerCommentLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
