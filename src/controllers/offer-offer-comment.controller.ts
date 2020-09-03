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
  OfferComment,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferOfferCommentController {
  constructor(
    @repository(OfferRepository) protected offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/offer-comments', {
    responses: {
      '200': {
        description: 'Array of Offer has many OfferComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OfferComment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OfferComment>,
  ): Promise<OfferComment[]> {
    return this.offerRepository.comments(id).find(filter);
  }

  @post('/offers/{id}/offer-comments', {
    responses: {
      '200': {
        description: 'Offer model instance',
        content: {'application/json': {schema: getModelSchemaRef(OfferComment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Offer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferComment, {
            title: 'NewOfferCommentInOffer',
            exclude: ['id'],
            optional: ['offer_id']
          }),
        },
      },
    }) offerComment: Omit<OfferComment, 'id'>,
  ): Promise<OfferComment> {
    return this.offerRepository.comments(id).create(offerComment);
  }

  @patch('/offers/{id}/offer-comments', {
    responses: {
      '200': {
        description: 'Offer.OfferComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferComment, {partial: true}),
        },
      },
    })
    offerComment: Partial<OfferComment>,
    @param.query.object('where', getWhereSchemaFor(OfferComment)) where?: Where<OfferComment>,
  ): Promise<Count> {
    return this.offerRepository.comments(id).patch(offerComment, where);
  }

  @del('/offers/{id}/offer-comments', {
    responses: {
      '200': {
        description: 'Offer.OfferComment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OfferComment)) where?: Where<OfferComment>,
  ): Promise<Count> {
    return this.offerRepository.comments(id).delete(where);
  }
}
