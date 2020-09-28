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
import {ActivityCommentLike} from '../models';
import {ActivityCommentLikeRepository} from '../repositories';

export class ActivityCommentLikeController {
  constructor(
    @repository(ActivityCommentLikeRepository)
    public activityCommentLikeRepository : ActivityCommentLikeRepository,
  ) {}

  @post('/activity-comment-likes', {
    responses: {
      '200': {
        description: 'ActivityCommentLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivityCommentLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityCommentLike, {
            title: 'NewActivityCommentLike',
            exclude: ['id'],
          }),
        },
      },
    })
    activityCommentLike: Omit<ActivityCommentLike, 'id'>,
  ): Promise<ActivityCommentLike> {
    return this.activityCommentLikeRepository.create(activityCommentLike);
  }

  @get('/activity-comment-likes/count', {
    responses: {
      '200': {
        description: 'ActivityCommentLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ActivityCommentLike) where?: Where<ActivityCommentLike>,
  ): Promise<Count> {
    return this.activityCommentLikeRepository.count(where);
  }

  @get('/activity-comment-likes', {
    responses: {
      '200': {
        description: 'Array of ActivityCommentLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ActivityCommentLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ActivityCommentLike) filter?: Filter<ActivityCommentLike>,
  ): Promise<ActivityCommentLike[]> {
    return this.activityCommentLikeRepository.find(filter);
  }

  @patch('/activity-comment-likes', {
    responses: {
      '200': {
        description: 'ActivityCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityCommentLike, {partial: true}),
        },
      },
    })
    activityCommentLike: ActivityCommentLike,
    @param.where(ActivityCommentLike) where?: Where<ActivityCommentLike>,
  ): Promise<Count> {
    return this.activityCommentLikeRepository.updateAll(activityCommentLike, where);
  }

  @get('/activity-comment-likes/{id}', {
    responses: {
      '200': {
        description: 'ActivityCommentLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ActivityCommentLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ActivityCommentLike, {exclude: 'where'}) filter?: FilterExcludingWhere<ActivityCommentLike>
  ): Promise<ActivityCommentLike> {
    return this.activityCommentLikeRepository.findById(id, filter);
  }

  @patch('/activity-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'ActivityCommentLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityCommentLike, {partial: true}),
        },
      },
    })
    activityCommentLike: ActivityCommentLike,
  ): Promise<void> {
    await this.activityCommentLikeRepository.updateById(id, activityCommentLike);
  }

  @put('/activity-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'ActivityCommentLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() activityCommentLike: ActivityCommentLike,
  ): Promise<void> {
    await this.activityCommentLikeRepository.replaceById(id, activityCommentLike);
  }

  @del('/activity-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'ActivityCommentLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.activityCommentLikeRepository.deleteById(id);
  }
}
