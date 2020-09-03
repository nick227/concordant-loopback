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
  Grievance,
  GrievanceComment,
} from '../models';
import {GrievanceRepository} from '../repositories';

export class GrievanceGrievanceCommentController {
  constructor(
    @repository(GrievanceRepository) protected grievanceRepository: GrievanceRepository,
  ) { }

  @get('/grievances/{id}/grievance-comments', {
    responses: {
      '200': {
        description: 'Array of Grievance has many GrievanceComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrievanceComment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<GrievanceComment>,
  ): Promise<GrievanceComment[]> {
    return this.grievanceRepository.comments(id).find(filter);
  }

  @post('/grievances/{id}/grievance-comments', {
    responses: {
      '200': {
        description: 'Grievance model instance',
        content: {'application/json': {schema: getModelSchemaRef(GrievanceComment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Grievance.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceComment, {
            title: 'NewGrievanceCommentInGrievance',
            exclude: ['id'],
            optional: ['grievance_id']
          }),
        },
      },
    }) grievanceComment: Omit<GrievanceComment, 'id'>,
  ): Promise<GrievanceComment> {
    return this.grievanceRepository.comments(id).create(grievanceComment);
  }

  @patch('/grievances/{id}/grievance-comments', {
    responses: {
      '200': {
        description: 'Grievance.GrievanceComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceComment, {partial: true}),
        },
      },
    })
    grievanceComment: Partial<GrievanceComment>,
    @param.query.object('where', getWhereSchemaFor(GrievanceComment)) where?: Where<GrievanceComment>,
  ): Promise<Count> {
    return this.grievanceRepository.comments(id).patch(grievanceComment, where);
  }

  @del('/grievances/{id}/grievance-comments', {
    responses: {
      '200': {
        description: 'Grievance.GrievanceComment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(GrievanceComment)) where?: Where<GrievanceComment>,
  ): Promise<Count> {
    return this.grievanceRepository.comments(id).delete(where);
  }
}
