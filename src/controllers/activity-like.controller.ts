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
import {ActivityLike} from '../models';
import {ActivityLikeRepository} from '../repositories';

export class ActivityLikeController {
  constructor(
    @repository(ActivityLikeRepository)
    public activityLikeRepository : ActivityLikeRepository,
  ) {}

  @post('/activity-likes', {
    responses: {
      '200': {
        description: 'ActivityLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivityLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityLike, {
            title: 'NewActivityLike',
            exclude: ['id'],
          }),
        },
      },
    })
    activityLike: Omit<ActivityLike, 'id'>,
  ): Promise<ActivityLike> {
    return this.activityLikeRepository.create(activityLike);
  }

  @get('/activity-likes/count', {
    responses: {
      '200': {
        description: 'ActivityLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ActivityLike) where?: Where<ActivityLike>,
  ): Promise<Count> {
    return this.activityLikeRepository.count(where);
  }

  @get('/activity-likes', {
    responses: {
      '200': {
        description: 'Array of ActivityLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ActivityLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ActivityLike) filter?: Filter<ActivityLike>,
  ): Promise<ActivityLike[]> {
    return this.activityLikeRepository.find(filter);
  }

  @patch('/activity-likes', {
    responses: {
      '200': {
        description: 'ActivityLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityLike, {partial: true}),
        },
      },
    })
    activityLike: ActivityLike,
    @param.where(ActivityLike) where?: Where<ActivityLike>,
  ): Promise<Count> {
    return this.activityLikeRepository.updateAll(activityLike, where);
  }

  @get('/activity-likes/{id}', {
    responses: {
      '200': {
        description: 'ActivityLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ActivityLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ActivityLike, {exclude: 'where'}) filter?: FilterExcludingWhere<ActivityLike>
  ): Promise<ActivityLike> {
    return this.activityLikeRepository.findById(id, filter);
  }

  @patch('/activity-likes/{id}', {
    responses: {
      '204': {
        description: 'ActivityLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityLike, {partial: true}),
        },
      },
    })
    activityLike: ActivityLike,
  ): Promise<void> {
    await this.activityLikeRepository.updateById(id, activityLike);
  }

  @put('/activity-likes/{id}', {
    responses: {
      '204': {
        description: 'ActivityLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() activityLike: ActivityLike,
  ): Promise<void> {
    await this.activityLikeRepository.replaceById(id, activityLike);
  }

  @del('/activity-likes/{id}', {
    responses: {
      '204': {
        description: 'ActivityLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.activityLikeRepository.deleteById(id);
  }
}
