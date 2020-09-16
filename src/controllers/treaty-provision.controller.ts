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
import {TreatyProvision} from '../models';
import {TreatyProvisionRepository} from '../repositories';

export class TreatyProvisionController {
  constructor(
    @repository(TreatyProvisionRepository)
    public treatyProvisionRepository : TreatyProvisionRepository,
  ) {}

  @post('/treaty-provisions', {
    responses: {
      '200': {
        description: 'TreatyProvision model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreatyProvision)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyProvision, {
            title: 'NewTreatyProvision',
            exclude: ['id'],
          }),
        },
      },
    })
    treatyProvision: Omit<TreatyProvision, 'id'>,
  ): Promise<TreatyProvision> {
    return this.treatyProvisionRepository.create(treatyProvision);
  }

  @get('/treaty-provisions/count', {
    responses: {
      '200': {
        description: 'TreatyProvision model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TreatyProvision) where?: Where<TreatyProvision>,
  ): Promise<Count> {
    return this.treatyProvisionRepository.count(where);
  }

  @get('/treaty-provisions', {
    responses: {
      '200': {
        description: 'Array of TreatyProvision model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TreatyProvision, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TreatyProvision) filter?: Filter<TreatyProvision>,
  ): Promise<TreatyProvision[]> {
    return this.treatyProvisionRepository.find(filter);
  }

  @patch('/treaty-provisions', {
    responses: {
      '200': {
        description: 'TreatyProvision PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyProvision, {partial: true}),
        },
      },
    })
    treatyProvision: TreatyProvision,
    @param.where(TreatyProvision) where?: Where<TreatyProvision>,
  ): Promise<Count> {
    return this.treatyProvisionRepository.updateAll(treatyProvision, where);
  }

  @get('/treaty-provisions/{id}', {
    responses: {
      '200': {
        description: 'TreatyProvision model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TreatyProvision, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TreatyProvision, {exclude: 'where'}) filter?: FilterExcludingWhere<TreatyProvision>
  ): Promise<TreatyProvision> {
    return this.treatyProvisionRepository.findById(id, filter);
  }

  @patch('/treaty-provisions/{id}', {
    responses: {
      '204': {
        description: 'TreatyProvision PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyProvision, {partial: true}),
        },
      },
    })
    treatyProvision: TreatyProvision,
  ): Promise<void> {
    await this.treatyProvisionRepository.updateById(id, treatyProvision);
  }

  @put('/treaty-provisions/{id}', {
    responses: {
      '204': {
        description: 'TreatyProvision PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() treatyProvision: TreatyProvision,
  ): Promise<void> {
    await this.treatyProvisionRepository.replaceById(id, treatyProvision);
  }

  @del('/treaty-provisions/{id}', {
    responses: {
      '204': {
        description: 'TreatyProvision DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.treatyProvisionRepository.deleteById(id);
  }
}
