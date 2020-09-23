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
  TreatyProvision,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyTreatyProvisionController {
  constructor(
    @repository(TreatyRepository) protected treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/treaty-provisions', {
    responses: {
      '200': {
        description: 'Array of Treaty has many TreatyProvision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TreatyProvision)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TreatyProvision>,
  ): Promise<TreatyProvision[]> {
    return this.treatyRepository.provisions(id).find(filter);
  }

  @post('/treaties/{id}/treaty-provisions', {
    responses: {
      '200': {
        description: 'Treaty model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreatyProvision)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Treaty.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyProvision, {
            title: 'NewTreatyProvisionInTreaty',
            exclude: ['id'],
            optional: ['treaty_id']
          }),
        },
      },
    }) treatyProvision: Omit<TreatyProvision, 'id'>,
  ): Promise<TreatyProvision> {
    return this.treatyRepository.provisions(id).create(treatyProvision);
  }

  @patch('/treaties/{id}/treaty-provisions', {
    responses: {
      '200': {
        description: 'Treaty.TreatyProvision PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyProvision, {partial: true}),
        },
      },
    })
    treatyProvision: Partial<TreatyProvision>,
    @param.query.object('where', getWhereSchemaFor(TreatyProvision)) where?: Where<TreatyProvision>,
  ): Promise<Count> {
    return this.treatyRepository.provisions(id).patch(treatyProvision, where);
  }

  @del('/treaties/{id}/treaty-provisions', {
    responses: {
      '200': {
        description: 'Treaty.TreatyProvision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TreatyProvision)) where?: Where<TreatyProvision>,
  ): Promise<Count> {
    return this.treatyRepository.provisions(id).delete(where);
  }
}
