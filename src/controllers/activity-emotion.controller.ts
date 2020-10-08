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
import {ActivityEmotion} from '../models';
import {ActivityEmotionRepository} from '../repositories';

export class ActivityEmotionController {
  constructor(
    @repository(ActivityEmotionRepository)
    public activityEmotionRepository : ActivityEmotionRepository,
  ) {}

  @post('/activity-emotions', {
    responses: {
      '200': {
        description: 'ActivityEmotion model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivityEmotion)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityEmotion, {
            title: 'NewActivityEmotion',
            exclude: ['id'],
          }),
        },
      },
    })
    activityEmotion: Omit<ActivityEmotion, 'id'>,
  ): Promise<ActivityEmotion> {
    return this.activityEmotionRepository.create(activityEmotion);
  }

  @get('/activity-emotions/count', {
    responses: {
      '200': {
        description: 'ActivityEmotion model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ActivityEmotion) where?: Where<ActivityEmotion>,
  ): Promise<Count> {
    return this.activityEmotionRepository.count(where);
  }

  @get('/activity-emotions', {
    responses: {
      '200': {
        description: 'Array of ActivityEmotion model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ActivityEmotion, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ActivityEmotion) filter?: Filter<ActivityEmotion>,
  ): Promise<ActivityEmotion[]> {
    return this.activityEmotionRepository.find(filter);
  }

  @patch('/activity-emotions', {
    responses: {
      '200': {
        description: 'ActivityEmotion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityEmotion, {partial: true}),
        },
      },
    })
    activityEmotion: ActivityEmotion,
    @param.where(ActivityEmotion) where?: Where<ActivityEmotion>,
  ): Promise<Count> {
    return this.activityEmotionRepository.updateAll(activityEmotion, where);
  }

  @get('/activity-emotions/{id}', {
    responses: {
      '200': {
        description: 'ActivityEmotion model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ActivityEmotion, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ActivityEmotion, {exclude: 'where'}) filter?: FilterExcludingWhere<ActivityEmotion>
  ): Promise<ActivityEmotion> {
    return this.activityEmotionRepository.findById(id, filter);
  }

  @patch('/activity-emotions/{id}', {
    responses: {
      '204': {
        description: 'ActivityEmotion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityEmotion, {partial: true}),
        },
      },
    })
    activityEmotion: ActivityEmotion,
  ): Promise<void> {
    await this.activityEmotionRepository.updateById(id, activityEmotion);
  }

  @put('/activity-emotions/{id}', {
    responses: {
      '204': {
        description: 'ActivityEmotion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() activityEmotion: ActivityEmotion,
  ): Promise<void> {
    await this.activityEmotionRepository.replaceById(id, activityEmotion);
  }

  @del('/activity-emotions/{id}', {
    responses: {
      '204': {
        description: 'ActivityEmotion DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.activityEmotionRepository.deleteById(id);
  }
}
