import {DefaultCrudRepository} from '@loopback/repository';
import {GrievanceCommentLike, GrievanceCommentLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GrievanceCommentLikeRepository extends DefaultCrudRepository<
  GrievanceCommentLike,
  typeof GrievanceCommentLike.prototype.id,
  GrievanceCommentLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(GrievanceCommentLike, dataSource);
  }
}
