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
  Treaty,
  Grievance,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyGrievanceController {
  constructor(
    @repository(TreatyRepository) protected treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/grievances', {
    responses: {
      '200': {
        description: 'Array of Treaty has many Grievance',
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
    return this.treatyRepository.grievances(id).find(filter);
  }

  @post('/treaties/{id}/grievances', {
    responses: {
      '200': {
        description: 'Treaty model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grievance)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Treaty.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grievance, {
            title: 'NewGrievanceInTreaty',
            exclude: ['id'],
            optional: ['treatyId']
          }),
        },
      },
    }) grievance: Omit<Grievance, 'id'>,
  ): Promise<Grievance> {
    return this.treatyRepository.grievances(id).create(grievance);
  }

  @patch('/treaties/{id}/grievances', {
    responses: {
      '200': {
        description: 'Treaty.Grievance PATCH success count',
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
    return this.treatyRepository.grievances(id).patch(grievance, where);
  }

  @del('/treaties/{id}/grievances', {
    responses: {
      '200': {
        description: 'Treaty.Grievance DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Grievance)) where?: Where<Grievance>,
  ): Promise<Count> {
    return this.treatyRepository.grievances(id).delete(where);
  }
}
