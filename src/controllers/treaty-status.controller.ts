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
import {TreatyStatus} from '../models';
import {TreatyStatusRepository} from '../repositories';

export class TreatyStatusController {
  constructor(
    @repository(TreatyStatusRepository)
    public treatyStatusRepository : TreatyStatusRepository,
  ) {}

  @post('/treaty-statuses', {
    responses: {
      '200': {
        description: 'TreatyStatus model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreatyStatus)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyStatus, {
            title: 'NewTreatyStatus',
            exclude: ['id'],
          }),
        },
      },
    })
    treatyStatus: Omit<TreatyStatus, 'id'>,
  ): Promise<TreatyStatus> {
    return this.treatyStatusRepository.create(treatyStatus);
  }

  @get('/treaty-statuses/count', {
    responses: {
      '200': {
        description: 'TreatyStatus model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TreatyStatus) where?: Where<TreatyStatus>,
  ): Promise<Count> {
    return this.treatyStatusRepository.count(where);
  }

  @get('/treaty-statuses', {
    responses: {
      '200': {
        description: 'Array of TreatyStatus model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TreatyStatus, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TreatyStatus) filter?: Filter<TreatyStatus>,
  ): Promise<TreatyStatus[]> {
    return this.treatyStatusRepository.find(filter);
  }

  @patch('/treaty-statuses', {
    responses: {
      '200': {
        description: 'TreatyStatus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyStatus, {partial: true}),
        },
      },
    })
    treatyStatus: TreatyStatus,
    @param.where(TreatyStatus) where?: Where<TreatyStatus>,
  ): Promise<Count> {
    return this.treatyStatusRepository.updateAll(treatyStatus, where);
  }

  @get('/treaty-statuses/{id}', {
    responses: {
      '200': {
        description: 'TreatyStatus model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TreatyStatus, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TreatyStatus, {exclude: 'where'}) filter?: FilterExcludingWhere<TreatyStatus>
  ): Promise<TreatyStatus> {
    return this.treatyStatusRepository.findById(id, filter);
  }

  @patch('/treaty-statuses/{id}', {
    responses: {
      '204': {
        description: 'TreatyStatus PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyStatus, {partial: true}),
        },
      },
    })
    treatyStatus: TreatyStatus,
  ): Promise<void> {
    await this.treatyStatusRepository.updateById(id, treatyStatus);
  }

  @put('/treaty-statuses/{id}', {
    responses: {
      '204': {
        description: 'TreatyStatus PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() treatyStatus: TreatyStatus,
  ): Promise<void> {
    await this.treatyStatusRepository.replaceById(id, treatyStatus);
  }

  @del('/treaty-statuses/{id}', {
    responses: {
      '204': {
        description: 'TreatyStatus DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.treatyStatusRepository.deleteById(id);
  }
}
