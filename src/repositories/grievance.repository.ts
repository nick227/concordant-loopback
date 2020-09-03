import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Grievance, GrievanceRelations, User, GrievanceComment} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {GrievanceCommentRepository} from './grievance-comment.repository';

export class GrievanceRepository extends DefaultCrudRepository<
  Grievance,
  typeof Grievance.prototype.id,
  GrievanceRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof Grievance.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<GrievanceComment, typeof Grievance.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('GrievanceCommentRepository') protected grievanceCommentRepositoryGetter: Getter<GrievanceCommentRepository>,
  ) {
    super(Grievance, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', grievanceCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
