import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TreatyProvision, TreatyProvisionRelations, ProvisionComment, ProvisionLike} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProvisionCommentRepository} from './provision-comment.repository';
import {ProvisionLikeRepository} from './provision-like.repository';

export class TreatyProvisionRepository extends DefaultCrudRepository<
  TreatyProvision,
  typeof TreatyProvision.prototype.id,
  TreatyProvisionRelations
> {

  public readonly comments: HasManyRepositoryFactory<ProvisionComment, typeof TreatyProvision.prototype.id>;

  public readonly likes: HasManyRepositoryFactory<ProvisionLike, typeof TreatyProvision.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('ProvisionCommentRepository') protected provisionCommentRepositoryGetter: Getter<ProvisionCommentRepository>, @repository.getter('ProvisionLikeRepository') protected provisionLikeRepositoryGetter: Getter<ProvisionLikeRepository>,
  ) {
    super(TreatyProvision, dataSource);
    this.likes = this.createHasManyRepositoryFactoryFor('likes', provisionLikeRepositoryGetter,);
    this.registerInclusionResolver('likes', this.likes.inclusionResolver);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', provisionCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
  }
}
