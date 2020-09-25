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
  OfferComment,
  OfferCommentLike,
} from '../models';
import {OfferCommentRepository} from '../repositories';

export class OfferCommentOfferCommentLikeController {
  constructor(
    @repository(OfferCommentRepository) protected offerCommentRepository: OfferCommentRepository,
  ) { }

  @get('/offer-comments/{id}/offer-comment-likes', {
    responses: {
      '200': {
        description: 'Array of OfferComment has many OfferCommentLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OfferCommentLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OfferCommentLike>,
  ): Promise<OfferCommentLike[]> {
    return this.offerCommentRepository.likes(id).find(filter);
  }

  @post('/offer-comments/{id}/offer-comment-likes', {
    responses: {
      '200': {
        description: 'OfferComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(OfferCommentLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof OfferComment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferCommentLike, {
            title: 'NewOfferCommentLikeInOfferComment',
            exclude: ['id'],
            optional: ['offer_comment_id']
          }),
        },
      },
    }) offerCommentLike: Omit<OfferCommentLike, 'id'>,
  ): Promise<OfferCommentLike> {
    return this.offerCommentRepository.likes(id).create(offerCommentLike);
  }

  @patch('/offer-comments/{id}/offer-comment-likes', {
    responses: {
      '200': {
        description: 'OfferComment.OfferCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferCommentLike, {partial: true}),
        },
      },
    })
    offerCommentLike: Partial<OfferCommentLike>,
    @param.query.object('where', getWhereSchemaFor(OfferCommentLike)) where?: Where<OfferCommentLike>,
  ): Promise<Count> {
    return this.offerCommentRepository.likes(id).patch(offerCommentLike, where);
  }

  @del('/offer-comments/{id}/offer-comment-likes', {
    responses: {
      '200': {
        description: 'OfferComment.OfferCommentLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OfferCommentLike)) where?: Where<OfferCommentLike>,
  ): Promise<Count> {
    return this.offerCommentRepository.likes(id).delete(where);
  }
}
