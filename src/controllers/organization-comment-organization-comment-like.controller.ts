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
  OrganizationComment,
  OrganizationCommentLike,
} from '../models';
import {OrganizationCommentRepository} from '../repositories';

export class OrganizationCommentOrganizationCommentLikeController {
  constructor(
    @repository(OrganizationCommentRepository) protected organizationCommentRepository: OrganizationCommentRepository,
  ) { }

  @get('/organization-comments/{id}/organization-comment-likes', {
    responses: {
      '200': {
        description: 'Array of OrganizationComment has many OrganizationCommentLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrganizationCommentLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrganizationCommentLike>,
  ): Promise<OrganizationCommentLike[]> {
    return this.organizationCommentRepository.likes(id).find(filter);
  }

  @post('/organization-comments/{id}/organization-comment-likes', {
    responses: {
      '200': {
        description: 'OrganizationComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrganizationCommentLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof OrganizationComment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationCommentLike, {
            title: 'NewOrganizationCommentLikeInOrganizationComment',
            exclude: ['id'],
            optional: ['organization_comment_id']
          }),
        },
      },
    }) organizationCommentLike: Omit<OrganizationCommentLike, 'id'>,
  ): Promise<OrganizationCommentLike> {
    return this.organizationCommentRepository.likes(id).create(organizationCommentLike);
  }

  @patch('/organization-comments/{id}/organization-comment-likes', {
    responses: {
      '200': {
        description: 'OrganizationComment.OrganizationCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationCommentLike, {partial: true}),
        },
      },
    })
    organizationCommentLike: Partial<OrganizationCommentLike>,
    @param.query.object('where', getWhereSchemaFor(OrganizationCommentLike)) where?: Where<OrganizationCommentLike>,
  ): Promise<Count> {
    return this.organizationCommentRepository.likes(id).patch(organizationCommentLike, where);
  }

  @del('/organization-comments/{id}/organization-comment-likes', {
    responses: {
      '200': {
        description: 'OrganizationComment.OrganizationCommentLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrganizationCommentLike)) where?: Where<OrganizationCommentLike>,
  ): Promise<Count> {
    return this.organizationCommentRepository.likes(id).delete(where);
  }
}
