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
import {OrganizationComment} from '../models';
import {OrganizationCommentRepository} from '../repositories';

export class OrganizationCommentController {
  constructor(
    @repository(OrganizationCommentRepository)
    public organizationCommentRepository : OrganizationCommentRepository,
  ) {}

  @post('/organization-comments', {
    responses: {
      '200': {
        description: 'OrganizationComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrganizationComment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationComment, {
            title: 'NewOrganizationComment',
            exclude: ['id'],
          }),
        },
      },
    })
    organizationComment: Omit<OrganizationComment, 'id'>,
  ): Promise<OrganizationComment> {
    return this.organizationCommentRepository.create(organizationComment);
  }

  @get('/organization-comments/count', {
    responses: {
      '200': {
        description: 'OrganizationComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(OrganizationComment) where?: Where<OrganizationComment>,
  ): Promise<Count> {
    return this.organizationCommentRepository.count(where);
  }

  @get('/organization-comments', {
    responses: {
      '200': {
        description: 'Array of OrganizationComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OrganizationComment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OrganizationComment) filter?: Filter<OrganizationComment>,
  ): Promise<OrganizationComment[]> {
    return this.organizationCommentRepository.find(filter);
  }

  @patch('/organization-comments', {
    responses: {
      '200': {
        description: 'OrganizationComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationComment, {partial: true}),
        },
      },
    })
    organizationComment: OrganizationComment,
    @param.where(OrganizationComment) where?: Where<OrganizationComment>,
  ): Promise<Count> {
    return this.organizationCommentRepository.updateAll(organizationComment, where);
  }

  @get('/organization-comments/{id}', {
    responses: {
      '200': {
        description: 'OrganizationComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OrganizationComment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrganizationComment, {exclude: 'where'}) filter?: FilterExcludingWhere<OrganizationComment>
  ): Promise<OrganizationComment> {
    return this.organizationCommentRepository.findById(id, filter);
  }

  @patch('/organization-comments/{id}', {
    responses: {
      '204': {
        description: 'OrganizationComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationComment, {partial: true}),
        },
      },
    })
    organizationComment: OrganizationComment,
  ): Promise<void> {
    await this.organizationCommentRepository.updateById(id, organizationComment);
  }

  @put('/organization-comments/{id}', {
    responses: {
      '204': {
        description: 'OrganizationComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() organizationComment: OrganizationComment,
  ): Promise<void> {
    await this.organizationCommentRepository.replaceById(id, organizationComment);
  }

  @del('/organization-comments/{id}', {
    responses: {
      '204': {
        description: 'OrganizationComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.organizationCommentRepository.deleteById(id);
  }
}
