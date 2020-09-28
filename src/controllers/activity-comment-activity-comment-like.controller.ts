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
  ActivityComment,
  ActivityCommentLike,
} from '../models';
import {ActivityCommentRepository} from '../repositories';

export class ActivityCommentActivityCommentLikeController {
  constructor(
    @repository(ActivityCommentRepository) protected activityCommentRepository: ActivityCommentRepository,
  ) { }

  @get('/activity-comments/{id}/activity-comment-likes', {
    responses: {
      '200': {
        description: 'Array of ActivityComment has many ActivityCommentLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ActivityCommentLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ActivityCommentLike>,
  ): Promise<ActivityCommentLike[]> {
    return this.activityCommentRepository.likes(id).find(filter);
  }

  @post('/activity-comments/{id}/activity-comment-likes', {
    responses: {
      '200': {
        description: 'ActivityComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivityCommentLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ActivityComment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityCommentLike, {
            title: 'NewActivityCommentLikeInActivityComment',
            exclude: ['id'],
            optional: ['activity_comment_id']
          }),
        },
      },
    }) activityCommentLike: Omit<ActivityCommentLike, 'id'>,
  ): Promise<ActivityCommentLike> {
    return this.activityCommentRepository.likes(id).create(activityCommentLike);
  }

  @patch('/activity-comments/{id}/activity-comment-likes', {
    responses: {
      '200': {
        description: 'ActivityComment.ActivityCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityCommentLike, {partial: true}),
        },
      },
    })
    activityCommentLike: Partial<ActivityCommentLike>,
    @param.query.object('where', getWhereSchemaFor(ActivityCommentLike)) where?: Where<ActivityCommentLike>,
  ): Promise<Count> {
    return this.activityCommentRepository.likes(id).patch(activityCommentLike, where);
  }

  @del('/activity-comments/{id}/activity-comment-likes', {
    responses: {
      '200': {
        description: 'ActivityComment.ActivityCommentLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ActivityCommentLike)) where?: Where<ActivityCommentLike>,
  ): Promise<Count> {
    return this.activityCommentRepository.likes(id).delete(where);
  }
}
