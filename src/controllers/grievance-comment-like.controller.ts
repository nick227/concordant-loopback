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
import {GrievanceCommentLike} from '../models';
import {GrievanceCommentLikeRepository} from '../repositories';

export class GrievanceCommentLikeController {
  constructor(
    @repository(GrievanceCommentLikeRepository)
    public grievanceCommentLikeRepository : GrievanceCommentLikeRepository,
  ) {}

  @post('/grievance-comment-likes', {
    responses: {
      '200': {
        description: 'GrievanceCommentLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(GrievanceCommentLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceCommentLike, {
            title: 'NewGrievanceCommentLike',
            exclude: ['id'],
          }),
        },
      },
    })
    grievanceCommentLike: Omit<GrievanceCommentLike, 'id'>,
  ): Promise<GrievanceCommentLike> {
    return this.grievanceCommentLikeRepository.create(grievanceCommentLike);
  }

  @get('/grievance-comment-likes/count', {
    responses: {
      '200': {
        description: 'GrievanceCommentLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(GrievanceCommentLike) where?: Where<GrievanceCommentLike>,
  ): Promise<Count> {
    return this.grievanceCommentLikeRepository.count(where);
  }

  @get('/grievance-comment-likes', {
    responses: {
      '200': {
        description: 'Array of GrievanceCommentLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GrievanceCommentLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(GrievanceCommentLike) filter?: Filter<GrievanceCommentLike>,
  ): Promise<GrievanceCommentLike[]> {
    return this.grievanceCommentLikeRepository.find(filter);
  }

  @patch('/grievance-comment-likes', {
    responses: {
      '200': {
        description: 'GrievanceCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceCommentLike, {partial: true}),
        },
      },
    })
    grievanceCommentLike: GrievanceCommentLike,
    @param.where(GrievanceCommentLike) where?: Where<GrievanceCommentLike>,
  ): Promise<Count> {
    return this.grievanceCommentLikeRepository.updateAll(grievanceCommentLike, where);
  }

  @get('/grievance-comment-likes/{id}', {
    responses: {
      '200': {
        description: 'GrievanceCommentLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GrievanceCommentLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GrievanceCommentLike, {exclude: 'where'}) filter?: FilterExcludingWhere<GrievanceCommentLike>
  ): Promise<GrievanceCommentLike> {
    return this.grievanceCommentLikeRepository.findById(id, filter);
  }

  @patch('/grievance-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'GrievanceCommentLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceCommentLike, {partial: true}),
        },
      },
    })
    grievanceCommentLike: GrievanceCommentLike,
  ): Promise<void> {
    await this.grievanceCommentLikeRepository.updateById(id, grievanceCommentLike);
  }

  @put('/grievance-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'GrievanceCommentLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() grievanceCommentLike: GrievanceCommentLike,
  ): Promise<void> {
    await this.grievanceCommentLikeRepository.replaceById(id, grievanceCommentLike);
  }

  @del('/grievance-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'GrievanceCommentLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.grievanceCommentLikeRepository.deleteById(id);
  }
}
