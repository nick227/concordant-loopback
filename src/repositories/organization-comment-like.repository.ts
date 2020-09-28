import {DefaultCrudRepository} from '@loopback/repository';
import {OrganizationCommentLike, OrganizationCommentLikeRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrganizationCommentLikeRepository extends DefaultCrudRepository<
  OrganizationCommentLike,
  typeof OrganizationCommentLike.prototype.id,
  OrganizationCommentLikeRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(OrganizationCommentLike, dataSource);
  }
}
