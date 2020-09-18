import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserMessage,
  User,
} from '../models';
import {UserMessageRepository} from '../repositories';

export class UserMessageUserController {
  constructor(
    @repository(UserMessageRepository)
    public userMessageRepository: UserMessageRepository,
  ) { }

  @get('/user-messages/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to UserMessage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof UserMessage.prototype.id,
  ): Promise<User> {
    return this.userMessageRepository.creator(id);
  }
}
