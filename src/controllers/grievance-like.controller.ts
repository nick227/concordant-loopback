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
import {GrievanceLike} from '../models';
import {GrievanceLikeRepository} from '../repositories';

export class GrievanceLikeController {
  constructor(
    @repository(GrievanceLikeRepository)
    public grievanceLikeRepository : GrievanceLikeRepository,
  ) {}

  @post('/grievance-likes', {
    responses: {
      '200': {
        description: 'GrievanceLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(GrievanceLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceLike, {
            title: 'NewGrievanceLike',
            exclude: ['id'],
          }),
        },
      },
    })
    grievanceLike: Omit<GrievanceLike, 'id'>,
  ): Promise<GrievanceLike> {
    return this.grievanceLikeRepository.create(grievanceLike);
  }

  @get('/grievance-likes/count', {
    responses: {
      '200': {
        description: 'GrievanceLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(GrievanceLike) where?: Where<GrievanceLike>,
  ): Promise<Count> {
    return this.grievanceLikeRepository.count(where);
  }

  @get('/grievance-likes', {
    responses: {
      '200': {
        description: 'Array of GrievanceLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GrievanceLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(GrievanceLike) filter?: Filter<GrievanceLike>,
  ): Promise<GrievanceLike[]> {
    return this.grievanceLikeRepository.find(filter);
  }

  @patch('/grievance-likes', {
    responses: {
      '200': {
        description: 'GrievanceLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceLike, {partial: true}),
        },
      },
    })
    grievanceLike: GrievanceLike,
    @param.where(GrievanceLike) where?: Where<GrievanceLike>,
  ): Promise<Count> {
    return this.grievanceLikeRepository.updateAll(grievanceLike, where);
  }

  @get('/grievance-likes/{id}', {
    responses: {
      '200': {
        description: 'GrievanceLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GrievanceLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GrievanceLike, {exclude: 'where'}) filter?: FilterExcludingWhere<GrievanceLike>
  ): Promise<GrievanceLike> {
    return this.grievanceLikeRepository.findById(id, filter);
  }

  @patch('/grievance-likes/{id}', {
    responses: {
      '204': {
        description: 'GrievanceLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceLike, {partial: true}),
        },
      },
    })
    grievanceLike: GrievanceLike,
  ): Promise<void> {
    await this.grievanceLikeRepository.updateById(id, grievanceLike);
  }

  @put('/grievance-likes/{id}', {
    responses: {
      '204': {
        description: 'GrievanceLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() grievanceLike: GrievanceLike,
  ): Promise<void> {
    await this.grievanceLikeRepository.replaceById(id, grievanceLike);
  }

  @del('/grievance-likes/{id}', {
    responses: {
      '204': {
        description: 'GrievanceLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.grievanceLikeRepository.deleteById(id);
  }
}
