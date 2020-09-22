import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DebateComment, DebateCommentRelations, Debate, User, DebateCommentLike} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DebateRepository} from './debate.repository';
import {UserRepository} from './user.repository';
import {DebateCommentLikeRepository} from './debate-comment-like.repository';

export class DebateCommentRepository extends DefaultCrudRepository<
  DebateComment,
  typeof DebateComment.prototype.id,
  DebateCommentRelations
> {

  public readonly debate: BelongsToAccessor<Debate, typeof DebateComment.prototype.id>;

  public readonly creator: BelongsToAccessor<User, typeof DebateComment.prototype.id>;

  public readonly likes: HasManyRepositoryFactory<DebateCommentLike, typeof DebateComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('DebateRepository') protected debateRepositoryGetter: Getter<DebateRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('DebateCommentLikeRepository') protected debateCommentLikeRepositoryGetter: Getter<DebateCommentLikeRepository>,
  ) {
    super(DebateComment, dataSource);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', debateCommentLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
    this.debate = this.createBelongsToAccessorFor('debate', debateRepositoryGetter,);
    this.registerInclusionResolver('debate', this.debate.inclusionResolver);
  }
}
