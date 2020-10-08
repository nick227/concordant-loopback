import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OrganizationChat, OrganizationChatRelations, User} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class OrganizationChatRepository extends DefaultCrudRepository<
  OrganizationChat,
  typeof OrganizationChat.prototype.id,
  OrganizationChatRelations
> {

  public readonly creator: BelongsToAccessor<User, typeof OrganizationChat.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(OrganizationChat, dataSource);
    this.creator = this.createBelongsToAccessorFor('creator', userRepositoryGetter,);
    this.registerInclusionResolver('creator', this.creator.inclusionResolver);
  }
}
