import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Organization, UserToOrganization} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserToOrganizationRepository} from './user-to-organization.repository';
import {OrganizationRepository} from './organization.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly organizations: HasManyThroughRepositoryFactory<Organization, typeof Organization.prototype.id,
          UserToOrganization,
          typeof User.prototype.id
        >;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserToOrganizationRepository') protected userToOrganizationRepositoryGetter: Getter<UserToOrganizationRepository>, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>,
  ) {
    super(User, dataSource);
    this.organizations = this.createHasManyThroughRepositoryFactoryFor('organizations', organizationRepositoryGetter, userToOrganizationRepositoryGetter,);
  }
}
