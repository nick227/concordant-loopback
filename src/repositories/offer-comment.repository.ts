import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OfferComment, OfferCommentRelations, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class OfferCommentRepository extends DefaultCrudRepository<
  OfferComment,
  typeof OfferComment.prototype.id,
  OfferCommentRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof OfferComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(OfferComment, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
