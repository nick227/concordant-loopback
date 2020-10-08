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
  Activity,
  ActivityEmotion,
} from '../models';
import {ActivityRepository} from '../repositories';

export class ActivityActivityEmotionController {
  constructor(
    @repository(ActivityRepository) protected activityRepository: ActivityRepository,
  ) { }

  @get('/activities/{id}/activity-emotions', {
    responses: {
      '200': {
        description: 'Array of Activity has many ActivityEmotion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ActivityEmotion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ActivityEmotion>,
  ): Promise<ActivityEmotion[]> {
    return this.activityRepository.emotions(id).find(filter);
  }

  @post('/activities/{id}/activity-emotions', {
    responses: {
      '200': {
        description: 'Activity model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivityEmotion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Activity.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityEmotion, {
            title: 'NewActivityEmotionInActivity',
            exclude: ['id'],
            optional: ['activity_id']
          }),
        },
      },
    }) activityEmotion: Omit<ActivityEmotion, 'id'>,
  ): Promise<ActivityEmotion> {
    return this.activityRepository.emotions(id).create(activityEmotion);
  }

  @patch('/activities/{id}/activity-emotions', {
    responses: {
      '200': {
        description: 'Activity.ActivityEmotion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityEmotion, {partial: true}),
        },
      },
    })
    activityEmotion: Partial<ActivityEmotion>,
    @param.query.object('where', getWhereSchemaFor(ActivityEmotion)) where?: Where<ActivityEmotion>,
  ): Promise<Count> {
    return this.activityRepository.emotions(id).patch(activityEmotion, where);
  }

  @del('/activities/{id}/activity-emotions', {
    responses: {
      '200': {
        description: 'Activity.ActivityEmotion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ActivityEmotion)) where?: Where<ActivityEmotion>,
  ): Promise<Count> {
    return this.activityRepository.emotions(id).delete(where);
  }
}
