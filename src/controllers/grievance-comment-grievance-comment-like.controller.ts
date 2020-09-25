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
  GrievanceComment,
  GrievanceCommentLike,
} from '../models';
import {GrievanceCommentRepository} from '../repositories';

export class GrievanceCommentGrievanceCommentLikeController {
  constructor(
    @repository(GrievanceCommentRepository) protected grievanceCommentRepository: GrievanceCommentRepository,
  ) { }

  @get('/grievance-comments/{id}/grievance-comment-likes', {
    responses: {
      '200': {
        description: 'Array of GrievanceComment has many GrievanceCommentLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrievanceCommentLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<GrievanceCommentLike>,
  ): Promise<GrievanceCommentLike[]> {
    return this.grievanceCommentRepository.likes(id).find(filter);
  }

  @post('/grievance-comments/{id}/grievance-comment-likes', {
    responses: {
      '200': {
        description: 'GrievanceComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(GrievanceCommentLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof GrievanceComment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceCommentLike, {
            title: 'NewGrievanceCommentLikeInGrievanceComment',
            exclude: ['id'],
            optional: ['grievance_comment_id']
          }),
        },
      },
    }) grievanceCommentLike: Omit<GrievanceCommentLike, 'id'>,
  ): Promise<GrievanceCommentLike> {
    return this.grievanceCommentRepository.likes(id).create(grievanceCommentLike);
  }

  @patch('/grievance-comments/{id}/grievance-comment-likes', {
    responses: {
      '200': {
        description: 'GrievanceComment.GrievanceCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrievanceCommentLike, {partial: true}),
        },
      },
    })
    grievanceCommentLike: Partial<GrievanceCommentLike>,
    @param.query.object('where', getWhereSchemaFor(GrievanceCommentLike)) where?: Where<GrievanceCommentLike>,
  ): Promise<Count> {
    return this.grievanceCommentRepository.likes(id).patch(grievanceCommentLike, where);
  }

  @del('/grievance-comments/{id}/grievance-comment-likes', {
    responses: {
      '200': {
        description: 'GrievanceComment.GrievanceCommentLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(GrievanceCommentLike)) where?: Where<GrievanceCommentLike>,
  ): Promise<Count> {
    return this.grievanceCommentRepository.likes(id).delete(where);
  }
}
