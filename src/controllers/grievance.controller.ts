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
import {Grievance} from '../models';
import {GrievanceRepository} from '../repositories';

export class GrievanceController {
  constructor(
    @repository(GrievanceRepository)
    public grievanceRepository : GrievanceRepository,
  ) {}

  @post('/grievances', {
    responses: {
      '200': {
        description: 'Grievance model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grievance)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grievance, {
            title: 'NewGrievance',
            exclude: ['id'],
          }),
        },
      },
    })
    grievance: Omit<Grievance, 'id'>,
  ): Promise<Grievance> {
    return this.grievanceRepository.create(grievance);
  }

  @get('/grievances/count', {
    responses: {
      '200': {
        description: 'Grievance model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Grievance) where?: Where<Grievance>,
  ): Promise<Count> {
    return this.grievanceRepository.count(where);
  }

  @get('/grievances', {
    responses: {
      '200': {
        description: 'Array of Grievance model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Grievance, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Grievance) filter?: Filter<Grievance>,
  ): Promise<Grievance[]> {
    return this.grievanceRepository.find(filter);
  }

  @patch('/grievances', {
    responses: {
      '200': {
        description: 'Grievance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grievance, {partial: true}),
        },
      },
    })
    grievance: Grievance,
    @param.where(Grievance) where?: Where<Grievance>,
  ): Promise<Count> {
    return this.grievanceRepository.updateAll(grievance, where);
  }

  @get('/grievances/{id}', {
    responses: {
      '200': {
        description: 'Grievance model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Grievance, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Grievance, {exclude: 'where'}) filter?: FilterExcludingWhere<Grievance>
  ): Promise<Grievance> {
    return this.grievanceRepository.findById(id, filter);
  }

  @patch('/grievances/{id}', {
    responses: {
      '204': {
        description: 'Grievance PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grievance, {partial: true}),
        },
      },
    })
    grievance: Grievance,
  ): Promise<void> {
    await this.grievanceRepository.updateById(id, grievance);
  }

  @put('/grievances/{id}', {
    responses: {
      '204': {
        description: 'Grievance PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() grievance: Grievance,
  ): Promise<void> {
    await this.grievanceRepository.replaceById(id, grievance);
  }

  @del('/grievances/{id}', {
    responses: {
      '204': {
        description: 'Grievance DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.grievanceRepository.deleteById(id);
  }
}
