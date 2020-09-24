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
  ProvisionComment,
  ProvisionCommentLike,
} from '../models';
import {ProvisionCommentRepository} from '../repositories';

export class ProvisionCommentProvisionCommentLikeController {
  constructor(
    @repository(ProvisionCommentRepository) protected provisionCommentRepository: ProvisionCommentRepository,
  ) { }

  @get('/provision-comments/{id}/provision-comment-likes', {
    responses: {
      '200': {
        description: 'Array of ProvisionComment has many ProvisionCommentLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProvisionCommentLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProvisionCommentLike>,
  ): Promise<ProvisionCommentLike[]> {
    return this.provisionCommentRepository.likes(id).find(filter);
  }

  @post('/provision-comments/{id}/provision-comment-likes', {
    responses: {
      '200': {
        description: 'ProvisionComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProvisionCommentLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProvisionComment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionCommentLike, {
            title: 'NewProvisionCommentLikeInProvisionComment',
            exclude: ['id'],
            optional: ['provision_comment_id']
          }),
        },
      },
    }) provisionCommentLike: Omit<ProvisionCommentLike, 'id'>,
  ): Promise<ProvisionCommentLike> {
    return this.provisionCommentRepository.likes(id).create(provisionCommentLike);
  }

  @patch('/provision-comments/{id}/provision-comment-likes', {
    responses: {
      '200': {
        description: 'ProvisionComment.ProvisionCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionCommentLike, {partial: true}),
        },
      },
    })
    provisionCommentLike: Partial<ProvisionCommentLike>,
    @param.query.object('where', getWhereSchemaFor(ProvisionCommentLike)) where?: Where<ProvisionCommentLike>,
  ): Promise<Count> {
    return this.provisionCommentRepository.likes(id).patch(provisionCommentLike, where);
  }

  @del('/provision-comments/{id}/provision-comment-likes', {
    responses: {
      '200': {
        description: 'ProvisionComment.ProvisionCommentLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProvisionCommentLike)) where?: Where<ProvisionCommentLike>,
  ): Promise<Count> {
    return this.provisionCommentRepository.likes(id).delete(where);
  }
}
