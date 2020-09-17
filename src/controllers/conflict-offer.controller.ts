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
  Offer,
} from '../models';
import {ConflictRepository} from '../repositories';

export class ConflictOfferController {
  constructor(
    @repository(ConflictRepository) protected conflictRepository: ConflictRepository,
  ) { }

  @get('/conflicts/{id}/offers', {
    responses: {
      '200': {
        description: 'Array of Conflict has many Offer',
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
    return this.conflictRepository.offers(id).find(filter);
  }

  @post('/conflicts/{id}/offers', {
    responses: {
      '200': {
        description: 'Conflict model instance',
        content: {'application/json': {schema: getModelSchemaRef(Offer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conflict.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {
            title: 'NewOfferInConflict',
            exclude: ['id'],
            optional: ['conflict_id']
          }),
        },
      },
    }) offer: Omit<Offer, 'id'>,
  ): Promise<Offer> {
    return this.conflictRepository.offers(id).create(offer);
  }

  @patch('/conflicts/{id}/offers', {
    responses: {
      '200': {
        description: 'Conflict.Offer PATCH success count',
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
    return this.conflictRepository.offers(id).patch(offer, where);
  }

  @del('/conflicts/{id}/offers', {
    responses: {
      '200': {
        description: 'Conflict.Offer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Offer)) where?: Where<Offer>,
  ): Promise<Count> {
    return this.conflictRepository.offers(id).delete(where);
  }
}
