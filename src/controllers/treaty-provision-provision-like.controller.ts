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
  TreatyProvision,
  ProvisionLike,
} from '../models';
import {TreatyProvisionRepository} from '../repositories';

export class TreatyProvisionProvisionLikeController {
  constructor(
    @repository(TreatyProvisionRepository) protected treatyProvisionRepository: TreatyProvisionRepository,
  ) { }

  @get('/treaty-provisions/{id}/provision-likes', {
    responses: {
      '200': {
        description: 'Array of TreatyProvision has many ProvisionLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProvisionLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProvisionLike>,
  ): Promise<ProvisionLike[]> {
    return this.treatyProvisionRepository.likes(id).find(filter);
  }

  @post('/treaty-provisions/{id}/provision-likes', {
    responses: {
      '200': {
        description: 'TreatyProvision model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProvisionLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TreatyProvision.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionLike, {
            title: 'NewProvisionLikeInTreatyProvision',
            exclude: ['id'],
            optional: ['provision_id']
          }),
        },
      },
    }) provisionLike: Omit<ProvisionLike, 'id'>,
  ): Promise<ProvisionLike> {
    return this.treatyProvisionRepository.likes(id).create(provisionLike);
  }

  @patch('/treaty-provisions/{id}/provision-likes', {
    responses: {
      '200': {
        description: 'TreatyProvision.ProvisionLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionLike, {partial: true}),
        },
      },
    })
    provisionLike: Partial<ProvisionLike>,
    @param.query.object('where', getWhereSchemaFor(ProvisionLike)) where?: Where<ProvisionLike>,
  ): Promise<Count> {
    return this.treatyProvisionRepository.likes(id).patch(provisionLike, where);
  }

  @del('/treaty-provisions/{id}/provision-likes', {
    responses: {
      '200': {
        description: 'TreatyProvision.ProvisionLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProvisionLike)) where?: Where<ProvisionLike>,
  ): Promise<Count> {
    return this.treatyProvisionRepository.likes(id).delete(where);
  }
}
