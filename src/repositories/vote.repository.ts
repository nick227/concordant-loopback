import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Vote, VoteRelations, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class VoteRepository extends DefaultCrudRepository<
  Vote,
  typeof Vote.prototype.id,
  VoteRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Vote.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Vote, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
