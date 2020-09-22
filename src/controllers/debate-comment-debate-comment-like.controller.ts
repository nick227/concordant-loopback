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
  DebateComment,
  DebateCommentLike,
} from '../models';
import {DebateCommentRepository} from '../repositories';

export class DebateCommentDebateCommentLikeController {
  constructor(
    @repository(DebateCommentRepository) protected debateCommentRepository: DebateCommentRepository,
  ) { }

  @get('/debate-comments/{id}/debate-comment-likes', {
    responses: {
      '200': {
        description: 'Array of DebateComment has many DebateCommentLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DebateCommentLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DebateCommentLike>,
  ): Promise<DebateCommentLike[]> {
    return this.debateCommentRepository.likes(id).find(filter);
  }

  @post('/debate-comments/{id}/debate-comment-likes', {
    responses: {
      '200': {
        description: 'DebateComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(DebateCommentLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DebateComment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateCommentLike, {
            title: 'NewDebateCommentLikeInDebateComment',
            exclude: ['id'],
            optional: ['debate_comment_id']
          }),
        },
      },
    }) debateCommentLike: Omit<DebateCommentLike, 'id'>,
  ): Promise<DebateCommentLike> {
    return this.debateCommentRepository.likes(id).create(debateCommentLike);
  }

  @patch('/debate-comments/{id}/debate-comment-likes', {
    responses: {
      '200': {
        description: 'DebateComment.DebateCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateCommentLike, {partial: true}),
        },
      },
    })
    debateCommentLike: Partial<DebateCommentLike>,
    @param.query.object('where', getWhereSchemaFor(DebateCommentLike)) where?: Where<DebateCommentLike>,
  ): Promise<Count> {
    return this.debateCommentRepository.likes(id).patch(debateCommentLike, where);
  }

  @del('/debate-comments/{id}/debate-comment-likes', {
    responses: {
      '200': {
        description: 'DebateComment.DebateCommentLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DebateCommentLike)) where?: Where<DebateCommentLike>,
  ): Promise<Count> {
    return this.debateCommentRepository.likes(id).delete(where);
  }
}
