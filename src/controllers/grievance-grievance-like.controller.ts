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
  GrievanceLike,
} from '../models';
import {GrievanceRepository} from '../repositories';

export class GrievanceGrievanceLikeController {
  constructor(
    @repository(GrievanceRepository) protected grievanceRepository: GrievanceRepository,
  ) { }

  @get('/grievances/{id}/grievance-likes', {
    responses: {
      '200': {
        description: 'Array of Grievance has many GrievanceLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrievanceLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<GrievanceLike>,
  ): Promise<GrievanceLike[]> {
    return this.grievanceRepository.likes(id).find(filter);
  }

  @post('/grievances/{id}/grievance-likes', {
    responses: {
      '200': {
        description: 'Grievance model instance',
        content: {'application/json': {schema: getModelSchemaRef(GrievanceLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Grievance.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceLike, {
            title: 'NewGrievanceLikeInGrievance',
            exclude: ['id'],
            optional: ['grievance_id']
          }),
        },
      },
    }) grievanceLike: Omit<GrievanceLike, 'id'>,
  ): Promise<GrievanceLike> {
    return this.grievanceRepository.likes(id).create(grievanceLike);
  }

  @patch('/grievances/{id}/grievance-likes', {
    responses: {
      '200': {
        description: 'Grievance.GrievanceLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceLike, {partial: true}),
        },
      },
    })
    grievanceLike: Partial<GrievanceLike>,
    @param.query.object('where', getWhereSchemaFor(GrievanceLike)) where?: Where<GrievanceLike>,
  ): Promise<Count> {
    return this.grievanceRepository.likes(id).patch(grievanceLike, where);
  }

  @del('/grievances/{id}/grievance-likes', {
    responses: {
      '200': {
        description: 'Grievance.GrievanceLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(GrievanceLike)) where?: Where<GrievanceLike>,
  ): Promise<Count> {
    return this.grievanceRepository.likes(id).delete(where);
  }
}
