import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrganizationChat,
  User,
} from '../models';
import {OrganizationChatRepository} from '../repositories';

export class OrganizationChatUserController {
  constructor(
    @repository(OrganizationChatRepository)
    public organizationChatRepository: OrganizationChatRepository,
  ) { }

  @get('/organization-chats/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to OrganizationChat',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof OrganizationChat.prototype.id,
  ): Promise<User> {
    return this.organizationChatRepository.creator(id);
  }
}
