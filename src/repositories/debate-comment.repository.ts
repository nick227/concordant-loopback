import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DebateComment, DebateCommentRelations, Debate, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DebateRepository} from './debate.repository';
import {UserRepository} from './user.repository';

export class DebateCommentRepository extends DefaultCrudRepository<
  DebateComment,
  typeof DebateComment.prototype.id,
  DebateCommentRelations
> {

  public readonly debate: BelongsToAccessor<Debate, typeof DebateComment.prototype.id>;

  public readonly creator: BelongsToAccessor<User, typeof DebateComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('DebateRepository') protected debateRepositoryGetter: Getter<DebateRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(DebateComment, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
    this.debate = this.createBelongsToAccessorFor('debate', debateRepositoryGetter,);
    this.registerInclusionResolver('debate', this.debate.inclusionResolver);
  }
}
