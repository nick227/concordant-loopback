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
  TreatyRating,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyTreatyRatingController {
  constructor(
    @repository(TreatyRepository) protected treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/treaty-ratings', {
    responses: {
      '200': {
        description: 'Array of Treaty has many TreatyRating',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TreatyRating)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TreatyRating>,
  ): Promise<TreatyRating[]> {
    return this.treatyRepository.ratings(id).find(filter);
  }

  @post('/treaties/{id}/treaty-ratings', {
    responses: {
      '200': {
        description: 'Treaty model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreatyRating)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Treaty.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyRating, {
            title: 'NewTreatyRatingInTreaty',
            exclude: ['id'],
            optional: ['treaty_id']
          }),
        },
      },
    }) treatyRating: Omit<TreatyRating, 'id'>,
  ): Promise<TreatyRating> {
    return this.treatyRepository.ratings(id).create(treatyRating);
  }

  @patch('/treaties/{id}/treaty-ratings', {
    responses: {
      '200': {
        description: 'Treaty.TreatyRating PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyRating, {partial: true}),
        },
      },
    })
    treatyRating: Partial<TreatyRating>,
    @param.query.object('where', getWhereSchemaFor(TreatyRating)) where?: Where<TreatyRating>,
  ): Promise<Count> {
    return this.treatyRepository.ratings(id).patch(treatyRating, where);
  }

  @del('/treaties/{id}/treaty-ratings', {
    responses: {
      '200': {
        description: 'Treaty.TreatyRating DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TreatyRating)) where?: Where<TreatyRating>,
  ): Promise<Count> {
    return this.treatyRepository.ratings(id).delete(where);
  }
}
