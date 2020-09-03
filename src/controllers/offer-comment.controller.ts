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
import {OfferComment} from '../models';
import {OfferCommentRepository} from '../repositories';

export class OfferCommentController {
  constructor(
    @repository(OfferCommentRepository)
    public offerCommentRepository : OfferCommentRepository,
  ) {}

  @post('/offer-comments', {
    responses: {
      '200': {
        description: 'OfferComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(OfferComment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferComment, {
            title: 'NewOfferComment',
            exclude: ['id'],
          }),
        },
      },
    })
    offerComment: Omit<OfferComment, 'id'>,
  ): Promise<OfferComment> {
    return this.offerCommentRepository.create(offerComment);
  }

  @get('/offer-comments/count', {
    responses: {
      '200': {
        description: 'OfferComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(OfferComment) where?: Where<OfferComment>,
  ): Promise<Count> {
    return this.offerCommentRepository.count(where);
  }

  @get('/offer-comments', {
    responses: {
      '200': {
        description: 'Array of OfferComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OfferComment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OfferComment) filter?: Filter<OfferComment>,
  ): Promise<OfferComment[]> {
    return this.offerCommentRepository.find(filter);
  }

  @patch('/offer-comments', {
    responses: {
      '200': {
        description: 'OfferComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferComment, {partial: true}),
        },
      },
    })
    offerComment: OfferComment,
    @param.where(OfferComment) where?: Where<OfferComment>,
  ): Promise<Count> {
    return this.offerCommentRepository.updateAll(offerComment, where);
  }

  @get('/offer-comments/{id}', {
    responses: {
      '200': {
        description: 'OfferComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OfferComment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OfferComment, {exclude: 'where'}) filter?: FilterExcludingWhere<OfferComment>
  ): Promise<OfferComment> {
    return this.offerCommentRepository.findById(id, filter);
  }

  @patch('/offer-comments/{id}', {
    responses: {
      '204': {
        description: 'OfferComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferComment, {partial: true}),
        },
      },
    })
    offerComment: OfferComment,
  ): Promise<void> {
    await this.offerCommentRepository.updateById(id, offerComment);
  }

  @put('/offer-comments/{id}', {
    responses: {
      '204': {
        description: 'OfferComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() offerComment: OfferComment,
  ): Promise<void> {
    await this.offerCommentRepository.replaceById(id, offerComment);
  }

  @del('/offer-comments/{id}', {
    responses: {
      '204': {
        description: 'OfferComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.offerCommentRepository.deleteById(id);
  }
}
