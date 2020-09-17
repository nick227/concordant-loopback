import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProvisionComment, ProvisionCommentRelations, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class ProvisionCommentRepository extends DefaultCrudRepository<
  ProvisionComment,
  typeof ProvisionComment.prototype.id,
  ProvisionCommentRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof ProvisionComment.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(ProvisionComment, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
