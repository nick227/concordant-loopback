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
import {GrievanceComment} from '../models';
import {GrievanceCommentRepository} from '../repositories';

export class GrievanceCommentController {
  constructor(
    @repository(GrievanceCommentRepository)
    public grievanceCommentRepository : GrievanceCommentRepository,
  ) {}

  @post('/grievance-comments', {
    responses: {
      '200': {
        description: 'GrievanceComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(GrievanceComment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceComment, {
            title: 'NewGrievanceComment',
            exclude: ['id'],
          }),
        },
      },
    })
    grievanceComment: Omit<GrievanceComment, 'id'>,
  ): Promise<GrievanceComment> {
    return this.grievanceCommentRepository.create(grievanceComment);
  }

  @get('/grievance-comments/count', {
    responses: {
      '200': {
        description: 'GrievanceComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(GrievanceComment) where?: Where<GrievanceComment>,
  ): Promise<Count> {
    return this.grievanceCommentRepository.count(where);
  }

  @get('/grievance-comments', {
    responses: {
      '200': {
        description: 'Array of GrievanceComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GrievanceComment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(GrievanceComment) filter?: Filter<GrievanceComment>,
  ): Promise<GrievanceComment[]> {
    return this.grievanceCommentRepository.find(filter);
  }

  @patch('/grievance-comments', {
    responses: {
      '200': {
        description: 'GrievanceComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceComment, {partial: true}),
        },
      },
    })
    grievanceComment: GrievanceComment,
    @param.where(GrievanceComment) where?: Where<GrievanceComment>,
  ): Promise<Count> {
    return this.grievanceCommentRepository.updateAll(grievanceComment, where);
  }

  @get('/grievance-comments/{id}', {
    responses: {
      '200': {
        description: 'GrievanceComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GrievanceComment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GrievanceComment, {exclude: 'where'}) filter?: FilterExcludingWhere<GrievanceComment>
  ): Promise<GrievanceComment> {
    return this.grievanceCommentRepository.findById(id, filter);
  }

  @patch('/grievance-comments/{id}', {
    responses: {
      '204': {
        description: 'GrievanceComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceComment, {partial: true}),
        },
      },
    })
    grievanceComment: GrievanceComment,
  ): Promise<void> {
    await this.grievanceCommentRepository.updateById(id, grievanceComment);
  }

  @put('/grievance-comments/{id}', {
    responses: {
      '204': {
        description: 'GrievanceComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() grievanceComment: GrievanceComment,
  ): Promise<void> {
    await this.grievanceCommentRepository.replaceById(id, grievanceComment);
  }

  @del('/grievance-comments/{id}', {
    responses: {
      '204': {
        description: 'GrievanceComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.grievanceCommentRepository.deleteById(id);
  }
}
