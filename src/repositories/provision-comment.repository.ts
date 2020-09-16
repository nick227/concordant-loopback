import {DefaultCrudRepository} from '@loopback/repository';
import {ProvisionComment, ProvisionCommentRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProvisionCommentRepository extends DefaultCrudRepository<
  ProvisionComment,
  typeof ProvisionComment.prototype.id,
  ProvisionCommentRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(ProvisionComment, dataSource);
  }
}
