import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Debate, DebateRelations, User, Conflict, DebateComment} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {ConflictRepository} from './conflict.repository';
import {DebateCommentRepository} from './debate-comment.repository';

export class DebateRepository extends DefaultCrudRepository<
  Debate,
  typeof Debate.prototype.id,
  DebateRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Debate.prototype.id>;

  public readonly conflict: BelongsToAccessor<Conflict, typeof Debate.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<DebateComment, typeof Debate.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ConflictRepository') protected conflictRepositoryGetter: Getter<ConflictRepository>, @repository.getter('DebateCommentRepository') protected debateCommentRepositoryGetter: Getter<DebateCommentRepository>,
  ) {
    super(Debate, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', debateCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.conflict = this.createBelongsToAccessorFor('conflict', conflictRepositoryGetter,);
    this.registerInclusionResolver('conflict', this.conflict.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
