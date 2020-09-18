import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {UserMessage, UserMessageRelations, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class UserMessageRepository extends DefaultCrudRepository<
  UserMessage,
  typeof UserMessage.prototype.id,
  UserMessageRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof UserMessage.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserMessage, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
