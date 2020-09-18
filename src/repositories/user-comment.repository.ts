import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {UserComment, UserCommentRelations, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class UserCommentRepository extends DefaultCrudRepository<
  UserComment,
  typeof UserComment.prototype.id,
  UserCommentRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof UserComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserComment, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
