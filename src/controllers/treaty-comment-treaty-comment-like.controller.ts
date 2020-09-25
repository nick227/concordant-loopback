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
  TreatyComment,
  TreatyCommentLike,
} from '../models';
import {TreatyCommentRepository} from '../repositories';

export class TreatyCommentTreatyCommentLikeController {
  constructor(
    @repository(TreatyCommentRepository) protected treatyCommentRepository: TreatyCommentRepository,
  ) { }

  @get('/treaty-comments/{id}/treaty-comment-likes', {
    responses: {
      '200': {
        description: 'Array of TreatyComment has many TreatyCommentLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TreatyCommentLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TreatyCommentLike>,
  ): Promise<TreatyCommentLike[]> {
    return this.treatyCommentRepository.likes(id).find(filter);
  }

  @post('/treaty-comments/{id}/treaty-comment-likes', {
    responses: {
      '200': {
        description: 'TreatyComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreatyCommentLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TreatyComment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyCommentLike, {
            title: 'NewTreatyCommentLikeInTreatyComment',
            exclude: ['id'],
            optional: ['treaty_comment_id']
          }),
        },
      },
    }) treatyCommentLike: Omit<TreatyCommentLike, 'id'>,
  ): Promise<TreatyCommentLike> {
    return this.treatyCommentRepository.likes(id).create(treatyCommentLike);
  }

  @patch('/treaty-comments/{id}/treaty-comment-likes', {
    responses: {
      '200': {
        description: 'TreatyComment.TreatyCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyCommentLike, {partial: true}),
        },
      },
    })
    treatyCommentLike: Partial<TreatyCommentLike>,
    @param.query.object('where', getWhereSchemaFor(TreatyCommentLike)) where?: Where<TreatyCommentLike>,
  ): Promise<Count> {
    return this.treatyCommentRepository.likes(id).patch(treatyCommentLike, where);
  }

  @del('/treaty-comments/{id}/treaty-comment-likes', {
    responses: {
      '200': {
        description: 'TreatyComment.TreatyCommentLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TreatyCommentLike)) where?: Where<TreatyCommentLike>,
  ): Promise<Count> {
    return this.treatyCommentRepository.likes(id).delete(where);
  }
}
