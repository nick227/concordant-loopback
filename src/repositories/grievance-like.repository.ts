import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {GrievanceLike, GrievanceLikeRelations, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class GrievanceLikeRepository extends DefaultCrudRepository<
  GrievanceLike,
  typeof GrievanceLike.prototype.id,
  GrievanceLikeRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof GrievanceLike.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(GrievanceLike, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
