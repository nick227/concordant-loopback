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
  Offer,
  OfferLike,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferOfferLikeController {
  constructor(
    @repository(OfferRepository) protected offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/offer-likes', {
    responses: {
      '200': {
        description: 'Array of Offer has many OfferLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OfferLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OfferLike>,
  ): Promise<OfferLike[]> {
    return this.offerRepository.likes(id).find(filter);
  }

  @post('/offers/{id}/offer-likes', {
    responses: {
      '200': {
        description: 'Offer model instance',
        content: {'application/json': {schema: getModelSchemaRef(OfferLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Offer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferLike, {
            title: 'NewOfferLikeInOffer',
            exclude: ['id'],
            optional: ['offer_id']
          }),
        },
      },
    }) offerLike: Omit<OfferLike, 'id'>,
  ): Promise<OfferLike> {
    return this.offerRepository.likes(id).create(offerLike);
  }

  @patch('/offers/{id}/offer-likes', {
    responses: {
      '200': {
        description: 'Offer.OfferLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferLike, {partial: true}),
        },
      },
    })
    offerLike: Partial<OfferLike>,
    @param.query.object('where', getWhereSchemaFor(OfferLike)) where?: Where<OfferLike>,
  ): Promise<Count> {
    return this.offerRepository.likes(id).patch(offerLike, where);
  }

  @del('/offers/{id}/offer-likes', {
    responses: {
      '200': {
        description: 'Offer.OfferLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OfferLike)) where?: Where<OfferLike>,
  ): Promise<Count> {
    return this.offerRepository.likes(id).delete(where);
  }
}
