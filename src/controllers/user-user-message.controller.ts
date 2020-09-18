import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  UserMessage,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserMessageController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-messages', {
    responses: {
      '200': {
        description: 'Array of User has many UserMessage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserMessage)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserMessage>,
  ): Promise<UserMessage[]> {
    return this.userRepository.messages(id).find(filter);
  }

  @post('/users/{id}/user-messages', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserMessage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserMessage, {
            title: 'NewUserMessageInUser',
            exclude: ['id'],
            optional: ['user_id']
          }),
        },
      },
    }) userMessage: Omit<UserMessage, 'id'>,
  ): Promise<UserMessage> {
    return this.userRepository.messages(id).create(userMessage);
  }

  @patch('/users/{id}/user-messages', {
    responses: {
      '200': {
        description: 'User.UserMessage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserMessage, {partial: true}),
        },
      },
    })
    userMessage: Partial<UserMessage>,
    @param.query.object('where', getWhereSchemaFor(UserMessage)) where?: Where<UserMessage>,
  ): Promise<Count> {
    return this.userRepository.messages(id).patch(userMessage, where);
  }

  @del('/users/{id}/user-messages', {
    responses: {
      '200': {
        description: 'User.UserMessage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserMessage)) where?: Where<UserMessage>,
  ): Promise<Count> {
    return this.userRepository.messages(id).delete(where);
  }
}
