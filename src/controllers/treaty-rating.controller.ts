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
import {TreatyRating} from '../models';
import {TreatyRatingRepository} from '../repositories';

export class TreatyRatingController {
  constructor(
    @repository(TreatyRatingRepository)
    public treatyRatingRepository : TreatyRatingRepository,
  ) {}

  @post('/treaty-ratings', {
    responses: {
      '200': {
        description: 'TreatyRating model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreatyRating)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyRating, {
            title: 'NewTreatyRating',
            exclude: ['id'],
          }),
        },
      },
    })
    treatyRating: Omit<TreatyRating, 'id'>,
  ): Promise<TreatyRating> {
    return this.treatyRatingRepository.create(treatyRating);
  }

  @get('/treaty-ratings/count', {
    responses: {
      '200': {
        description: 'TreatyRating model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TreatyRating) where?: Where<TreatyRating>,
  ): Promise<Count> {
    return this.treatyRatingRepository.count(where);
  }

  @get('/treaty-ratings', {
    responses: {
      '200': {
        description: 'Array of TreatyRating model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TreatyRating, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TreatyRating) filter?: Filter<TreatyRating>,
  ): Promise<TreatyRating[]> {
    return this.treatyRatingRepository.find(filter);
  }

  @patch('/treaty-ratings', {
    responses: {
      '200': {
        description: 'TreatyRating PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyRating, {partial: true}),
        },
      },
    })
    treatyRating: TreatyRating,
    @param.where(TreatyRating) where?: Where<TreatyRating>,
  ): Promise<Count> {
    return this.treatyRatingRepository.updateAll(treatyRating, where);
  }

  @get('/treaty-ratings/{id}', {
    responses: {
      '200': {
        description: 'TreatyRating model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TreatyRating, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TreatyRating, {exclude: 'where'}) filter?: FilterExcludingWhere<TreatyRating>
  ): Promise<TreatyRating> {
    return this.treatyRatingRepository.findById(id, filter);
  }

  @patch('/treaty-ratings/{id}', {
    responses: {
      '204': {
        description: 'TreatyRating PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyRating, {partial: true}),
        },
      },
    })
    treatyRating: TreatyRating,
  ): Promise<void> {
    await this.treatyRatingRepository.updateById(id, treatyRating);
  }

  @put('/treaty-ratings/{id}', {
    responses: {
      '204': {
        description: 'TreatyRating PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() treatyRating: TreatyRating,
  ): Promise<void> {
    await this.treatyRatingRepository.replaceById(id, treatyRating);
  }

  @del('/treaty-ratings/{id}', {
    responses: {
      '204': {
        description: 'TreatyRating DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.treatyRatingRepository.deleteById(id);
  }
}
