import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {UserMessage} from '../models';
import {UserMessageRepository} from '../repositories';

export class UserMessageController {
  constructor(
    @repository(UserMessageRepository)
    public userMessageRepository : UserMessageRepository,
  ) {}

  @post('/user-messages', {
    responses: {
      '200': {
        description: 'UserMessage model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserMessage)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserMessage, {
            title: 'NewUserMessage',
            exclude: ['id'],
          }),
        },
      },
    })
    userMessage: Omit<UserMessage, 'id'>,
  ): Promise<UserMessage> {
    return this.userMessageRepository.create(userMessage);
  }

  @get('/user-messages/count', {
    responses: {
      '200': {
        description: 'UserMessage model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserMessage) where?: Where<UserMessage>,
  ): Promise<Count> {
    return this.userMessageRepository.count(where);
  }

  @get('/user-messages', {
    responses: {
      '200': {
        description: 'Array of UserMessage model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserMessage, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserMessage) filter?: Filter<UserMessage>,
  ): Promise<UserMessage[]> {
    return this.userMessageRepository.find(filter);
  }

  @patch('/user-messages', {
    responses: {
      '200': {
        description: 'UserMessage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserMessage, {partial: true}),
        },
      },
    })
    userMessage: UserMessage,
    @param.where(UserMessage) where?: Where<UserMessage>,
  ): Promise<Count> {
    return this.userMessageRepository.updateAll(userMessage, where);
  }

  @get('/user-messages/{id}', {
    responses: {
      '200': {
        description: 'UserMessage model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserMessage, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserMessage, {exclude: 'where'}) filter?: FilterExcludingWhere<UserMessage>
  ): Promise<UserMessage> {
    return this.userMessageRepository.findById(id, filter);
  }

  @patch('/user-messages/{id}', {
    responses: {
      '204': {
        description: 'UserMessage PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserMessage, {partial: true}),
        },
      },
    })
    userMessage: UserMessage,
  ): Promise<void> {
    await this.userMessageRepository.updateById(id, userMessage);
  }

  @put('/user-messages/{id}', {
    responses: {
      '204': {
        description: 'UserMessage PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userMessage: UserMessage,
  ): Promise<void> {
    await this.userMessageRepository.replaceById(id, userMessage);
  }

  @del('/user-messages/{id}', {
    responses: {
      '204': {
        description: 'UserMessage DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userMessageRepository.deleteById(id);
  }
}
