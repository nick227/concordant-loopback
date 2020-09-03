import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TreatyComment, TreatyCommentRelations, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class TreatyCommentRepository extends DefaultCrudRepository<
  TreatyComment,
  typeof TreatyComment.prototype.id,
  TreatyCommentRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof TreatyComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(TreatyComment, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
