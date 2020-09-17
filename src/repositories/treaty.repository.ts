import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {Treaty, TreatyRelations, Grievance, Offer, User, Vote, TreatyComment, Organization, Conflict, TreatyStatus} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GrievanceRepository} from './grievance.repository';
import {OfferRepository} from './offer.repository';
import {UserRepository} from './user.repository';
import {VoteRepository} from './vote.repository';
import {TreatyCommentRepository} from './treaty-comment.repository';
import {OrganizationRepository} from './organization.repository';
import {ConflictRepository} from './conflict.repository';
import {TreatyStatusRepository} from './treaty-status.repository';

export class TreatyRepository extends DefaultCrudRepository<
  Treaty,
  typeof Treaty.prototype.id,
  TreatyRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Treaty.prototype.id>;

  public readonly votes: HasManyRepositoryFactory<Vote, typeof Treaty.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<TreatyComment, typeof Treaty.prototype.id>;

  public readonly organization: BelongsToAccessor<Organization, typeof Treaty.prototype.id>;

  public readonly conflict: BelongsToAccessor<Conflict, typeof Treaty.prototype.id>;

  public readonly status: BelongsToAccessor<TreatyStatus, typeof Treaty.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('VoteRepository') protected voteRepositoryGetter: Getter<VoteRepository>, @repository.getter('TreatyCommentRepository') protected treatyCommentRepositoryGetter: Getter<TreatyCommentRepository>, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>, @repository.getter('ConflictRepository') protected conflictRepositoryGetter: Getter<ConflictRepository>, @repository.getter('TreatyStatusRepository') protected treatyStatusRepositoryGetter: Getter<TreatyStatusRepository>,
  ) {
    super(Treaty, dataSource);
    this.status = this.createBelongsToAccessorFor('status', treatyStatusRepositoryGetter,);
    this.registerInclusionResolver('status', this.status.inclusionResolver);
    this.conflict = this.createBelongsToAccessorFor('conflict', conflictRepositoryGetter,);
    this.registerInclusionResolver('conflict', this.conflict.inclusionResolver);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', treatyCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.votes = this.createHasManyRepositoryFactoryFor('votes', voteRepositoryGetter,);
    this.registerInclusionResolver('votes', this.votes.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
