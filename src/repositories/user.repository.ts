import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Organization, UserToOrganization, UserComment, UserMessage} from '../models';
import {ConcordantDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserToOrganizationRepository} from './user-to-organization.repository';
import {OrganizationRepository} from './organization.repository';
import {UserCommentRepository} from './user-comment.repository';
import {UserMessageRepository} from './user-message.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly organizations: HasManyThroughRepositoryFactory<Organization, typeof Organization.prototype.id,
          UserToOrganization,
          typeof User.prototype.id
        >;

  public readonly comments: HasManyRepositoryFactory<UserComment, typeof User.prototype.id>;

  public readonly messages: HasManyRepositoryFactory<UserMessage, typeof User.prototype.id>;

  constructor(
    @inject('datasources.concordant') dataSource: ConcordantDataSource, @repository.getter('UserToOrganizationRepository') protected userToOrganizationRepositoryGetter: Getter<UserToOrganizationRepository>, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>, @repository.getter('UserCommentRepository') protected userCommentRepositoryGetter: Getter<UserCommentRepository>, @repository.getter('UserMessageRepository') protected userMessageRepositoryGetter: Getter<UserMessageRepository>,
  ) {
    super(User, dataSource);
    this.messages = this.createHasManyRepositoryFactoryFor('messages', userMessageRepositoryGetter,);
    this.registerInclusionResolver('messages', this.messages.inclusionResolver);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', userCommentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.organizations = this.createHasManyThroughRepositoryFactoryFor('organizations', organizationRepositoryGetter, userToOrganizationRepositoryGetter,);
  }
}
