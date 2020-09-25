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
import {OfferCommentLike} from '../models';
import {OfferCommentLikeRepository} from '../repositories';

export class OfferCommentLikeController {
  constructor(
    @repository(OfferCommentLikeRepository)
    public offerCommentLikeRepository : OfferCommentLikeRepository,
  ) {}

  @post('/offer-comment-likes', {
    responses: {
      '200': {
        description: 'OfferCommentLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(OfferCommentLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferCommentLike, {
            title: 'NewOfferCommentLike',
            exclude: ['id'],
          }),
        },
      },
    })
    offerCommentLike: Omit<OfferCommentLike, 'id'>,
  ): Promise<OfferCommentLike> {
    return this.offerCommentLikeRepository.create(offerCommentLike);
  }

  @get('/offer-comment-likes/count', {
    responses: {
      '200': {
        description: 'OfferCommentLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(OfferCommentLike) where?: Where<OfferCommentLike>,
  ): Promise<Count> {
    return this.offerCommentLikeRepository.count(where);
  }

  @get('/offer-comment-likes', {
    responses: {
      '200': {
        description: 'Array of OfferCommentLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OfferCommentLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OfferCommentLike) filter?: Filter<OfferCommentLike>,
  ): Promise<OfferCommentLike[]> {
    return this.offerCommentLikeRepository.find(filter);
  }

  @patch('/offer-comment-likes', {
    responses: {
      '200': {
        description: 'OfferCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferCommentLike, {partial: true}),
        },
      },
    })
    offerCommentLike: OfferCommentLike,
    @param.where(OfferCommentLike) where?: Where<OfferCommentLike>,
  ): Promise<Count> {
    return this.offerCommentLikeRepository.updateAll(offerCommentLike, where);
  }

  @get('/offer-comment-likes/{id}', {
    responses: {
      '200': {
        description: 'OfferCommentLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OfferCommentLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OfferCommentLike, {exclude: 'where'}) filter?: FilterExcludingWhere<OfferCommentLike>
  ): Promise<OfferCommentLike> {
    return this.offerCommentLikeRepository.findById(id, filter);
  }

  @patch('/offer-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'OfferCommentLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferCommentLike, {partial: true}),
        },
      },
    })
    offerCommentLike: OfferCommentLike,
  ): Promise<void> {
    await this.offerCommentLikeRepository.updateById(id, offerCommentLike);
  }

  @put('/offer-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'OfferCommentLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() offerCommentLike: OfferCommentLike,
  ): Promise<void> {
    await this.offerCommentLikeRepository.replaceById(id, offerCommentLike);
  }

  @del('/offer-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'OfferCommentLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.offerCommentLikeRepository.deleteById(id);
  }
}
