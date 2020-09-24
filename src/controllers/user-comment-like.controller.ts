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
import {UserCommentLike} from '../models';
import {UserCommentLikeRepository} from '../repositories';

export class UserCommentLikeController {
  constructor(
    @repository(UserCommentLikeRepository)
    public userCommentLikeRepository : UserCommentLikeRepository,
  ) {}

  @post('/user-comment-likes', {
    responses: {
      '200': {
        description: 'UserCommentLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserCommentLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCommentLike, {
            title: 'NewUserCommentLike',
            exclude: ['id'],
          }),
        },
      },
    })
    userCommentLike: Omit<UserCommentLike, 'id'>,
  ): Promise<UserCommentLike> {
    return this.userCommentLikeRepository.create(userCommentLike);
  }

  @get('/user-comment-likes/count', {
    responses: {
      '200': {
        description: 'UserCommentLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserCommentLike) where?: Where<UserCommentLike>,
  ): Promise<Count> {
    return this.userCommentLikeRepository.count(where);
  }

  @get('/user-comment-likes', {
    responses: {
      '200': {
        description: 'Array of UserCommentLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserCommentLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserCommentLike) filter?: Filter<UserCommentLike>,
  ): Promise<UserCommentLike[]> {
    return this.userCommentLikeRepository.find(filter);
  }

  @patch('/user-comment-likes', {
    responses: {
      '200': {
        description: 'UserCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCommentLike, {partial: true}),
        },
      },
    })
    userCommentLike: UserCommentLike,
    @param.where(UserCommentLike) where?: Where<UserCommentLike>,
  ): Promise<Count> {
    return this.userCommentLikeRepository.updateAll(userCommentLike, where);
  }

  @get('/user-comment-likes/{id}', {
    responses: {
      '200': {
        description: 'UserCommentLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserCommentLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserCommentLike, {exclude: 'where'}) filter?: FilterExcludingWhere<UserCommentLike>
  ): Promise<UserCommentLike> {
    return this.userCommentLikeRepository.findById(id, filter);
  }

  @patch('/user-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'UserCommentLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCommentLike, {partial: true}),
        },
      },
    })
    userCommentLike: UserCommentLike,
  ): Promise<void> {
    await this.userCommentLikeRepository.updateById(id, userCommentLike);
  }

  @put('/user-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'UserCommentLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userCommentLike: UserCommentLike,
  ): Promise<void> {
    await this.userCommentLikeRepository.replaceById(id, userCommentLike);
  }

  @del('/user-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'UserCommentLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userCommentLikeRepository.deleteById(id);
  }
}
