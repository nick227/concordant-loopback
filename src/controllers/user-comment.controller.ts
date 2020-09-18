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
import {UserComment} from '../models';
import {UserCommentRepository} from '../repositories';

export class UserCommentController {
  constructor(
    @repository(UserCommentRepository)
    public userCommentRepository : UserCommentRepository,
  ) {}

  @post('/user-comments', {
    responses: {
      '200': {
        description: 'UserComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserComment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserComment, {
            title: 'NewUserComment',
            exclude: ['id'],
          }),
        },
      },
    })
    userComment: Omit<UserComment, 'id'>,
  ): Promise<UserComment> {
    return this.userCommentRepository.create(userComment);
  }

  @get('/user-comments/count', {
    responses: {
      '200': {
        description: 'UserComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserComment) where?: Where<UserComment>,
  ): Promise<Count> {
    return this.userCommentRepository.count(where);
  }

  @get('/user-comments', {
    responses: {
      '200': {
        description: 'Array of UserComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserComment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserComment) filter?: Filter<UserComment>,
  ): Promise<UserComment[]> {
    return this.userCommentRepository.find(filter);
  }

  @patch('/user-comments', {
    responses: {
      '200': {
        description: 'UserComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserComment, {partial: true}),
        },
      },
    })
    userComment: UserComment,
    @param.where(UserComment) where?: Where<UserComment>,
  ): Promise<Count> {
    return this.userCommentRepository.updateAll(userComment, where);
  }

  @get('/user-comments/{id}', {
    responses: {
      '200': {
        description: 'UserComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserComment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserComment, {exclude: 'where'}) filter?: FilterExcludingWhere<UserComment>
  ): Promise<UserComment> {
    return this.userCommentRepository.findById(id, filter);
  }

  @patch('/user-comments/{id}', {
    responses: {
      '204': {
        description: 'UserComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserComment, {partial: true}),
        },
      },
    })
    userComment: UserComment,
  ): Promise<void> {
    await this.userCommentRepository.updateById(id, userComment);
  }

  @put('/user-comments/{id}', {
    responses: {
      '204': {
        description: 'UserComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userComment: UserComment,
  ): Promise<void> {
    await this.userCommentRepository.replaceById(id, userComment);
  }

  @del('/user-comments/{id}', {
    responses: {
      '204': {
        description: 'UserComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userCommentRepository.deleteById(id);
  }
}
