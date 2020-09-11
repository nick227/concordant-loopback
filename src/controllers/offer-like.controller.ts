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
import {OfferLike} from '../models';
import {OfferLikeRepository} from '../repositories';

export class OfferLikeController {
  constructor(
    @repository(OfferLikeRepository)
    public offerLikeRepository : OfferLikeRepository,
  ) {}

  @post('/offer-likes', {
    responses: {
      '200': {
        description: 'OfferLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(OfferLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferLike, {
            title: 'NewOfferLike',
            exclude: ['id'],
          }),
        },
      },
    })
    offerLike: Omit<OfferLike, 'id'>,
  ): Promise<OfferLike> {
    return this.offerLikeRepository.create(offerLike);
  }

  @get('/offer-likes/count', {
    responses: {
      '200': {
        description: 'OfferLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(OfferLike) where?: Where<OfferLike>,
  ): Promise<Count> {
    return this.offerLikeRepository.count(where);
  }

  @get('/offer-likes', {
    responses: {
      '200': {
        description: 'Array of OfferLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OfferLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OfferLike) filter?: Filter<OfferLike>,
  ): Promise<OfferLike[]> {
    return this.offerLikeRepository.find(filter);
  }

  @patch('/offer-likes', {
    responses: {
      '200': {
        description: 'OfferLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferLike, {partial: true}),
        },
      },
    })
    offerLike: OfferLike,
    @param.where(OfferLike) where?: Where<OfferLike>,
  ): Promise<Count> {
    return this.offerLikeRepository.updateAll(offerLike, where);
  }

  @get('/offer-likes/{id}', {
    responses: {
      '200': {
        description: 'OfferLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OfferLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OfferLike, {exclude: 'where'}) filter?: FilterExcludingWhere<OfferLike>
  ): Promise<OfferLike> {
    return this.offerLikeRepository.findById(id, filter);
  }

  @patch('/offer-likes/{id}', {
    responses: {
      '204': {
        description: 'OfferLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferLike, {partial: true}),
        },
      },
    })
    offerLike: OfferLike,
  ): Promise<void> {
    await this.offerLikeRepository.updateById(id, offerLike);
  }

  @put('/offer-likes/{id}', {
    responses: {
      '204': {
        description: 'OfferLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() offerLike: OfferLike,
  ): Promise<void> {
    await this.offerLikeRepository.replaceById(id, offerLike);
  }

  @del('/offer-likes/{id}', {
    responses: {
      '204': {
        description: 'OfferLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.offerLikeRepository.deleteById(id);
  }
}
