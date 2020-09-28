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
  ActivityComment,
} from '../models';
import {ActivityRepository} from '../repositories';

export class ActivityActivityCommentController {
  constructor(
    @repository(ActivityRepository) protected activityRepository: ActivityRepository,
  ) { }

  @get('/activities/{id}/activity-comments', {
    responses: {
      '200': {
        description: 'Array of Activity has many ActivityComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ActivityComment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ActivityComment>,
  ): Promise<ActivityComment[]> {
    return this.activityRepository.comments(id).find(filter);
  }

  @post('/activities/{id}/activity-comments', {
    responses: {
      '200': {
        description: 'Activity model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivityComment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Activity.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityComment, {
            title: 'NewActivityCommentInActivity',
            exclude: ['id'],
            optional: ['activity_id']
          }),
        },
      },
    }) activityComment: Omit<ActivityComment, 'id'>,
  ): Promise<ActivityComment> {
    return this.activityRepository.comments(id).create(activityComment);
  }

  @patch('/activities/{id}/activity-comments', {
    responses: {
      '200': {
        description: 'Activity.ActivityComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityComment, {partial: true}),
        },
      },
    })
    activityComment: Partial<ActivityComment>,
    @param.query.object('where', getWhereSchemaFor(ActivityComment)) where?: Where<ActivityComment>,
  ): Promise<Count> {
    return this.activityRepository.comments(id).patch(activityComment, where);
  }

  @del('/activities/{id}/activity-comments', {
    responses: {
      '200': {
        description: 'Activity.ActivityComment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ActivityComment)) where?: Where<ActivityComment>,
  ): Promise<Count> {
    return this.activityRepository.comments(id).delete(where);
  }
}
