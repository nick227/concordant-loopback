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
import {ActivityComment} from '../models';
import {ActivityCommentRepository} from '../repositories';

export class ActivityCommentController {
  constructor(
    @repository(ActivityCommentRepository)
    public activityCommentRepository : ActivityCommentRepository,
  ) {}

  @post('/activity-comments', {
    responses: {
      '200': {
        description: 'ActivityComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivityComment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityComment, {
            title: 'NewActivityComment',
            exclude: ['id'],
          }),
        },
      },
    })
    activityComment: Omit<ActivityComment, 'id'>,
  ): Promise<ActivityComment> {
    return this.activityCommentRepository.create(activityComment);
  }

  @get('/activity-comments/count', {
    responses: {
      '200': {
        description: 'ActivityComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ActivityComment) where?: Where<ActivityComment>,
  ): Promise<Count> {
    return this.activityCommentRepository.count(where);
  }

  @get('/activity-comments', {
    responses: {
      '200': {
        description: 'Array of ActivityComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ActivityComment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ActivityComment) filter?: Filter<ActivityComment>,
  ): Promise<ActivityComment[]> {
    return this.activityCommentRepository.find(filter);
  }

  @patch('/activity-comments', {
    responses: {
      '200': {
        description: 'ActivityComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityComment, {partial: true}),
        },
      },
    })
    activityComment: ActivityComment,
    @param.where(ActivityComment) where?: Where<ActivityComment>,
  ): Promise<Count> {
    return this.activityCommentRepository.updateAll(activityComment, where);
  }

  @get('/activity-comments/{id}', {
    responses: {
      '200': {
        description: 'ActivityComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ActivityComment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ActivityComment, {exclude: 'where'}) filter?: FilterExcludingWhere<ActivityComment>
  ): Promise<ActivityComment> {
    return this.activityCommentRepository.findById(id, filter);
  }

  @patch('/activity-comments/{id}', {
    responses: {
      '204': {
        description: 'ActivityComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityComment, {partial: true}),
        },
      },
    })
    activityComment: ActivityComment,
  ): Promise<void> {
    await this.activityCommentRepository.updateById(id, activityComment);
  }

  @put('/activity-comments/{id}', {
    responses: {
      '204': {
        description: 'ActivityComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() activityComment: ActivityComment,
  ): Promise<void> {
    await this.activityCommentRepository.replaceById(id, activityComment);
  }

  @del('/activity-comments/{id}', {
    responses: {
      '204': {
        description: 'ActivityComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.activityCommentRepository.deleteById(id);
  }
}
