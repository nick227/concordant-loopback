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
  UserComment,
  UserCommentLike,
} from '../models';
import {UserCommentRepository} from '../repositories';

export class UserCommentUserCommentLikeController {
  constructor(
    @repository(UserCommentRepository) protected userCommentRepository: UserCommentRepository,
  ) { }

  @get('/user-comments/{id}/user-comment-likes', {
    responses: {
      '200': {
        description: 'Array of UserComment has many UserCommentLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserCommentLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserCommentLike>,
  ): Promise<UserCommentLike[]> {
    return this.userCommentRepository.likes(id).find(filter);
  }

  @post('/user-comments/{id}/user-comment-likes', {
    responses: {
      '200': {
        description: 'UserComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserCommentLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof UserComment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCommentLike, {
            title: 'NewUserCommentLikeInUserComment',
            exclude: ['id'],
            optional: ['user_comment_id']
          }),
        },
      },
    }) userCommentLike: Omit<UserCommentLike, 'id'>,
  ): Promise<UserCommentLike> {
    return this.userCommentRepository.likes(id).create(userCommentLike);
  }

  @patch('/user-comments/{id}/user-comment-likes', {
    responses: {
      '200': {
        description: 'UserComment.UserCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCommentLike, {partial: true}),
        },
      },
    })
    userCommentLike: Partial<UserCommentLike>,
    @param.query.object('where', getWhereSchemaFor(UserCommentLike)) where?: Where<UserCommentLike>,
  ): Promise<Count> {
    return this.userCommentRepository.likes(id).patch(userCommentLike, where);
  }

  @del('/user-comments/{id}/user-comment-likes', {
    responses: {
      '200': {
        description: 'UserComment.UserCommentLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserCommentLike)) where?: Where<UserCommentLike>,
  ): Promise<Count> {
    return this.userCommentRepository.likes(id).delete(where);
  }
}
