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
import {ProvisionStatus} from '../models';
import {ProvisionStatusRepository} from '../repositories';

export class ProvisionStatusController {
  constructor(
    @repository(ProvisionStatusRepository)
    public provisionStatusRepository : ProvisionStatusRepository,
  ) {}

  @post('/provision-statuses', {
    responses: {
      '200': {
        description: 'ProvisionStatus model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProvisionStatus)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionStatus, {
            title: 'NewProvisionStatus',
            exclude: ['id'],
          }),
        },
      },
    })
    provisionStatus: Omit<ProvisionStatus, 'id'>,
  ): Promise<ProvisionStatus> {
    return this.provisionStatusRepository.create(provisionStatus);
  }

  @get('/provision-statuses/count', {
    responses: {
      '200': {
        description: 'ProvisionStatus model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ProvisionStatus) where?: Where<ProvisionStatus>,
  ): Promise<Count> {
    return this.provisionStatusRepository.count(where);
  }

  @get('/provision-statuses', {
    responses: {
      '200': {
        description: 'Array of ProvisionStatus model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProvisionStatus, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ProvisionStatus) filter?: Filter<ProvisionStatus>,
  ): Promise<ProvisionStatus[]> {
    return this.provisionStatusRepository.find(filter);
  }

  @patch('/provision-statuses', {
    responses: {
      '200': {
        description: 'ProvisionStatus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionStatus, {partial: true}),
        },
      },
    })
    provisionStatus: ProvisionStatus,
    @param.where(ProvisionStatus) where?: Where<ProvisionStatus>,
  ): Promise<Count> {
    return this.provisionStatusRepository.updateAll(provisionStatus, where);
  }

  @get('/provision-statuses/{id}', {
    responses: {
      '200': {
        description: 'ProvisionStatus model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProvisionStatus, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProvisionStatus, {exclude: 'where'}) filter?: FilterExcludingWhere<ProvisionStatus>
  ): Promise<ProvisionStatus> {
    return this.provisionStatusRepository.findById(id, filter);
  }

  @patch('/provision-statuses/{id}', {
    responses: {
      '204': {
        description: 'ProvisionStatus PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionStatus, {partial: true}),
        },
      },
    })
    provisionStatus: ProvisionStatus,
  ): Promise<void> {
    await this.provisionStatusRepository.updateById(id, provisionStatus);
  }

  @put('/provision-statuses/{id}', {
    responses: {
      '204': {
        description: 'ProvisionStatus PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() provisionStatus: ProvisionStatus,
  ): Promise<void> {
    await this.provisionStatusRepository.replaceById(id, provisionStatus);
  }

  @del('/provision-statuses/{id}', {
    responses: {
      '204': {
        description: 'ProvisionStatus DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.provisionStatusRepository.deleteById(id);
  }
}
