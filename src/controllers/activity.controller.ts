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
import {Activity} from '../models';
import {ActivityRepository} from '../repositories';

export class ActivityController {
  constructor(
    @repository(ActivityRepository)
    public activityRepository : ActivityRepository,
  ) {}

  @post('/activities', {
    responses: {
      '200': {
        description: 'Activity model instance',
        content: {'application/json': {schema: getModelSchemaRef(Activity)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activity, {
            title: 'NewActivity',
            exclude: ['id'],
          }),
        },
      },
    })
    activity: Omit<Activity, 'id'>,
  ): Promise<Activity> {
    return this.activityRepository.create(activity);
  }

  @get('/activities/count', {
    responses: {
      '200': {
        description: 'Activity model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Activity) where?: Where<Activity>,
  ): Promise<Count> {
    return this.activityRepository.count(where);
  }

  @get('/activities', {
    responses: {
      '200': {
        description: 'Array of Activity model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Activity, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Activity) filter?: Filter<Activity>,
  ): Promise<Activity[]> {
    return this.activityRepository.find(filter);
  }

  @patch('/activities', {
    responses: {
      '200': {
        description: 'Activity PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activity, {partial: true}),
        },
      },
    })
    activity: Activity,
    @param.where(Activity) where?: Where<Activity>,
  ): Promise<Count> {
    return this.activityRepository.updateAll(activity, where);
  }

  @get('/activities/{id}', {
    responses: {
      '200': {
        description: 'Activity model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Activity, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Activity, {exclude: 'where'}) filter?: FilterExcludingWhere<Activity>
  ): Promise<Activity> {
    return this.activityRepository.findById(id, filter);
  }

  @patch('/activities/{id}', {
    responses: {
      '204': {
        description: 'Activity PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activity, {partial: true}),
        },
      },
    })
    activity: Activity,
  ): Promise<void> {
    await this.activityRepository.updateById(id, activity);
  }

  @put('/activities/{id}', {
    responses: {
      '204': {
        description: 'Activity PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() activity: Activity,
  ): Promise<void> {
    await this.activityRepository.replaceById(id, activity);
  }

  @del('/activities/{id}', {
    responses: {
      '204': {
        description: 'Activity DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.activityRepository.deleteById(id);
  }
}
