import {DefaultCrudRepository} from '@loopback/repository';
import {ProvisionCommentLike, ProvisionCommentLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProvisionCommentLikeRepository extends DefaultCrudRepository<
  ProvisionCommentLike,
  typeof ProvisionCommentLike.prototype.id,
  ProvisionCommentLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(ProvisionCommentLike, dataSource);
  }
}
