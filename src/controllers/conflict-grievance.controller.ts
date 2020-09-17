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
  Conflict,
  Grievance,
} from '../models';
import {ConflictRepository} from '../repositories';

export class ConflictGrievanceController {
  constructor(
    @repository(ConflictRepository) protected conflictRepository: ConflictRepository,
  ) { }

  @get('/conflicts/{id}/grievances', {
    responses: {
      '200': {
        description: 'Array of Conflict has many Grievance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grievance)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Grievance>,
  ): Promise<Grievance[]> {
    return this.conflictRepository.grievances(id).find(filter);
  }

  @post('/conflicts/{id}/grievances', {
    responses: {
      '200': {
        description: 'Conflict model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grievance)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conflict.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grievance, {
            title: 'NewGrievanceInConflict',
            exclude: ['id'],
            optional: ['conflict_id']
          }),
        },
      },
    }) grievance: Omit<Grievance, 'id'>,
  ): Promise<Grievance> {
    return this.conflictRepository.grievances(id).create(grievance);
  }

  @patch('/conflicts/{id}/grievances', {
    responses: {
      '200': {
        description: 'Conflict.Grievance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grievance, {partial: true}),
        },
      },
    })
    grievance: Partial<Grievance>,
    @param.query.object('where', getWhereSchemaFor(Grievance)) where?: Where<Grievance>,
  ): Promise<Count> {
    return this.conflictRepository.grievances(id).patch(grievance, where);
  }

  @del('/conflicts/{id}/grievances', {
    responses: {
      '200': {
        description: 'Conflict.Grievance DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Grievance)) where?: Where<Grievance>,
  ): Promise<Count> {
    return this.conflictRepository.grievances(id).delete(where);
  }
}
