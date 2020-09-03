import {DefaultCrudRepository} from '@loopback/repository';
import {UserToOrganization, UserToOrganizationRelations} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserToOrganizationRepository extends DefaultCrudRepository<
  UserToOrganization,
  typeof UserToOrganization.prototype.id,
  UserToOrganizationRelations
> {
  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource,
  ) {
    super(UserToOrganization, dataSource);
  }
}
