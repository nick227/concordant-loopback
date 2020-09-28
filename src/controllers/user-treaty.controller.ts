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
  Treaty,
} from '../models';
import {UserRepository} from '../repositories';

export class UserTreatyController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/treaties', {
    responses: {
      '200': {
        description: 'Array of User has many Treaty',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Treaty)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Treaty>,
  ): Promise<Treaty[]> {
    return this.userRepository.treaties(id).find(filter);
  }

  @post('/users/{id}/treaties', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Treaty)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Treaty, {
            title: 'NewTreatyInUser',
            exclude: ['id'],
            optional: ['creator_user_id']
          }),
        },
      },
    }) treaty: Omit<Treaty, 'id'>,
  ): Promise<Treaty> {
    return this.userRepository.treaties(id).create(treaty);
  }

  @patch('/users/{id}/treaties', {
    responses: {
      '200': {
        description: 'User.Treaty PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Treaty, {partial: true}),
        },
      },
    })
    treaty: Partial<Treaty>,
    @param.query.object('where', getWhereSchemaFor(Treaty)) where?: Where<Treaty>,
  ): Promise<Count> {
    return this.userRepository.treaties(id).patch(treaty, where);
  }

  @del('/users/{id}/treaties', {
    responses: {
      '200': {
        description: 'User.Treaty DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Treaty)) where?: Where<Treaty>,
  ): Promise<Count> {
    return this.userRepository.treaties(id).delete(where);
  }
}
