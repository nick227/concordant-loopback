import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {Treaty, TreatyRelations, Grievance, Offer, User, Vote, TreatyComment} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GrievanceRepository} from './grievance.repository';
import {OfferRepository} from './offer.repository';
import {UserRepository} from './user.repository';
import {VoteRepository} from './vote.repository';
import {TreatyCommentRepository} from './treaty-comment.repository';

export class TreatyRepository extends DefaultCrudRepository<
  Treaty,
  typeof Treaty.prototype.id,
  TreatyRelations
> {

  public readonly grievances: HasManyRepositoryFactory<Grievance, typeof Treaty.prototype.id>;

  public readonly offers: HasManyRepositoryFactory<Offer, typeof Treaty.prototype.id>;

  public readonly creator: BelongsToAccessor<User, typeof Treaty.prototype.id>;

  public readonly votes: HasManyRepositoryFactory<Vote, typeof Treaty.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<TreatyComment, typeof Treaty.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('GrievanceRepository') protected grievanceRepositoryGetter: Getter<GrievanceRepository>, @repository.getter('OfferRepository') protected offerRepositoryGetter: Getter<OfferRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('VoteRepository') protected voteRepositoryGetter: Getter<VoteRepository>, @repository.getter('TreatyCommentRepository') protected treatyCommentRepositoryGetter: Getter<TreatyCommentRepository>,
  ) {
    super(Treaty, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', treatyCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.votes = this.createHasManyRepositoryFactoryFor('votes', voteRepositoryGetter,);
    this.registerInclusionResolver('votes', this.votes.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
    this.offers = this.createHasManyRepositoryFactoryFor('offers', offerRepositoryGetter,);
    this.registerInclusionResolver('offers', this.offers.inclusionResolver);
    this.grievances = this.createHasManyRepositoryFactoryFor('grievances', grievanceRepositoryGetter,);
    this.registerInclusionResolver('grievances', this.grievances.inclusionResolver);
  }
}
