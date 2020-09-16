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
import {ProvisionLike} from '../models';
import {ProvisionLikeRepository} from '../repositories';

export class ProvisionLikeController {
  constructor(
    @repository(ProvisionLikeRepository)
    public provisionLikeRepository : ProvisionLikeRepository,
  ) {}

  @post('/provision-likes', {
    responses: {
      '200': {
        description: 'ProvisionLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProvisionLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionLike, {
            title: 'NewProvisionLike',
            exclude: ['id'],
          }),
        },
      },
    })
    provisionLike: Omit<ProvisionLike, 'id'>,
  ): Promise<ProvisionLike> {
    return this.provisionLikeRepository.create(provisionLike);
  }

  @get('/provision-likes/count', {
    responses: {
      '200': {
        description: 'ProvisionLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ProvisionLike) where?: Where<ProvisionLike>,
  ): Promise<Count> {
    return this.provisionLikeRepository.count(where);
  }

  @get('/provision-likes', {
    responses: {
      '200': {
        description: 'Array of ProvisionLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProvisionLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ProvisionLike) filter?: Filter<ProvisionLike>,
  ): Promise<ProvisionLike[]> {
    return this.provisionLikeRepository.find(filter);
  }

  @patch('/provision-likes', {
    responses: {
      '200': {
        description: 'ProvisionLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionLike, {partial: true}),
        },
      },
    })
    provisionLike: ProvisionLike,
    @param.where(ProvisionLike) where?: Where<ProvisionLike>,
  ): Promise<Count> {
    return this.provisionLikeRepository.updateAll(provisionLike, where);
  }

  @get('/provision-likes/{id}', {
    responses: {
      '200': {
        description: 'ProvisionLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProvisionLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProvisionLike, {exclude: 'where'}) filter?: FilterExcludingWhere<ProvisionLike>
  ): Promise<ProvisionLike> {
    return this.provisionLikeRepository.findById(id, filter);
  }

  @patch('/provision-likes/{id}', {
    responses: {
      '204': {
        description: 'ProvisionLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionLike, {partial: true}),
        },
      },
    })
    provisionLike: ProvisionLike,
  ): Promise<void> {
    await this.provisionLikeRepository.updateById(id, provisionLike);
  }

  @put('/provision-likes/{id}', {
    responses: {
      '204': {
        description: 'ProvisionLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() provisionLike: ProvisionLike,
  ): Promise<void> {
    await this.provisionLikeRepository.replaceById(id, provisionLike);
  }

  @del('/provision-likes/{id}', {
    responses: {
      '204': {
        description: 'ProvisionLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.provisionLikeRepository.deleteById(id);
  }
}
