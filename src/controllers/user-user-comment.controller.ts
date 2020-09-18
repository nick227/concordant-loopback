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
  UserComment,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserCommentController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-comments', {
    responses: {
      '200': {
        description: 'Array of User has many UserComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserComment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserComment>,
  ): Promise<UserComment[]> {
    return this.userRepository.comments(id).find(filter);
  }

  @post('/users/{id}/user-comments', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserComment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserComment, {
            title: 'NewUserCommentInUser',
            exclude: ['id'],
            optional: ['user_id']
          }),
        },
      },
    }) userComment: Omit<UserComment, 'id'>,
  ): Promise<UserComment> {
    return this.userRepository.comments(id).create(userComment);
  }

  @patch('/users/{id}/user-comments', {
    responses: {
      '200': {
        description: 'User.UserComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserComment, {partial: true}),
        },
      },
    })
    userComment: Partial<UserComment>,
    @param.query.object('where', getWhereSchemaFor(UserComment)) where?: Where<UserComment>,
  ): Promise<Count> {
    return this.userRepository.comments(id).patch(userComment, where);
  }

  @del('/users/{id}/user-comments', {
    responses: {
      '200': {
        description: 'User.UserComment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserComment)) where?: Where<UserComment>,
  ): Promise<Count> {
    return this.userRepository.comments(id).delete(where);
  }
}
