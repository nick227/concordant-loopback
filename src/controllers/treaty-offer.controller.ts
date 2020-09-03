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
  Offer,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyOfferController {
  constructor(
    @repository(TreatyRepository) protected treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/offers', {
    responses: {
      '200': {
        description: 'Array of Treaty has many Offer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Offer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Offer>,
  ): Promise<Offer[]> {
    return this.treatyRepository.offers(id).find(filter);
  }

  @post('/treaties/{id}/offers', {
    responses: {
      '200': {
        description: 'Treaty model instance',
        content: {'application/json': {schema: getModelSchemaRef(Offer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Treaty.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {
            title: 'NewOfferInTreaty',
            exclude: ['id'],
            optional: ['treaty_id']
          }),
        },
      },
    }) offer: Omit<Offer, 'id'>,
  ): Promise<Offer> {
    return this.treatyRepository.offers(id).create(offer);
  }

  @patch('/treaties/{id}/offers', {
    responses: {
      '200': {
        description: 'Treaty.Offer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {partial: true}),
        },
      },
    })
    offer: Partial<Offer>,
    @param.query.object('where', getWhereSchemaFor(Offer)) where?: Where<Offer>,
  ): Promise<Count> {
    return this.treatyRepository.offers(id).patch(offer, where);
  }

  @del('/treaties/{id}/offers', {
    responses: {
      '200': {
        description: 'Treaty.Offer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Offer)) where?: Where<Offer>,
  ): Promise<Count> {
    return this.treatyRepository.offers(id).delete(where);
  }
}
