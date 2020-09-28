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
  Organization,
  OrganizationComment,
} from '../models';
import {OrganizationRepository} from '../repositories';

export class OrganizationOrganizationCommentController {
  constructor(
    @repository(OrganizationRepository) protected organizationRepository: OrganizationRepository,
  ) { }

  @get('/organizations/{id}/organization-comments', {
    responses: {
      '200': {
        description: 'Array of Organization has many OrganizationComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrganizationComment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrganizationComment>,
  ): Promise<OrganizationComment[]> {
    return this.organizationRepository.comments(id).find(filter);
  }

  @post('/organizations/{id}/organization-comments', {
    responses: {
      '200': {
        description: 'Organization model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrganizationComment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Organization.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationComment, {
            title: 'NewOrganizationCommentInOrganization',
            exclude: ['id'],
            optional: ['organization_id']
          }),
        },
      },
    }) organizationComment: Omit<OrganizationComment, 'id'>,
  ): Promise<OrganizationComment> {
    return this.organizationRepository.comments(id).create(organizationComment);
  }

  @patch('/organizations/{id}/organization-comments', {
    responses: {
      '200': {
        description: 'Organization.OrganizationComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationComment, {partial: true}),
        },
      },
    })
    organizationComment: Partial<OrganizationComment>,
    @param.query.object('where', getWhereSchemaFor(OrganizationComment)) where?: Where<OrganizationComment>,
  ): Promise<Count> {
    return this.organizationRepository.comments(id).patch(organizationComment, where);
  }

  @del('/organizations/{id}/organization-comments', {
    responses: {
      '200': {
        description: 'Organization.OrganizationComment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrganizationComment)) where?: Where<OrganizationComment>,
  ): Promise<Count> {
    return this.organizationRepository.comments(id).delete(where);
  }
}
