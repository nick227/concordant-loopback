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
import {OrganizationCommentLike} from '../models';
import {OrganizationCommentLikeRepository} from '../repositories';

export class OrganizationCommentLikeController {
  constructor(
    @repository(OrganizationCommentLikeRepository)
    public organizationCommentLikeRepository : OrganizationCommentLikeRepository,
  ) {}

  @post('/organization-comment-likes', {
    responses: {
      '200': {
        description: 'OrganizationCommentLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrganizationCommentLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationCommentLike, {
            title: 'NewOrganizationCommentLike',
            exclude: ['id'],
          }),
        },
      },
    })
    organizationCommentLike: Omit<OrganizationCommentLike, 'id'>,
  ): Promise<OrganizationCommentLike> {
    return this.organizationCommentLikeRepository.create(organizationCommentLike);
  }

  @get('/organization-comment-likes/count', {
    responses: {
      '200': {
        description: 'OrganizationCommentLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(OrganizationCommentLike) where?: Where<OrganizationCommentLike>,
  ): Promise<Count> {
    return this.organizationCommentLikeRepository.count(where);
  }

  @get('/organization-comment-likes', {
    responses: {
      '200': {
        description: 'Array of OrganizationCommentLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OrganizationCommentLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OrganizationCommentLike) filter?: Filter<OrganizationCommentLike>,
  ): Promise<OrganizationCommentLike[]> {
    return this.organizationCommentLikeRepository.find(filter);
  }

  @patch('/organization-comment-likes', {
    responses: {
      '200': {
        description: 'OrganizationCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationCommentLike, {partial: true}),
        },
      },
    })
    organizationCommentLike: OrganizationCommentLike,
    @param.where(OrganizationCommentLike) where?: Where<OrganizationCommentLike>,
  ): Promise<Count> {
    return this.organizationCommentLikeRepository.updateAll(organizationCommentLike, where);
  }

  @get('/organization-comment-likes/{id}', {
    responses: {
      '200': {
        description: 'OrganizationCommentLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OrganizationCommentLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrganizationCommentLike, {exclude: 'where'}) filter?: FilterExcludingWhere<OrganizationCommentLike>
  ): Promise<OrganizationCommentLike> {
    return this.organizationCommentLikeRepository.findById(id, filter);
  }

  @patch('/organization-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'OrganizationCommentLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationCommentLike, {partial: true}),
        },
      },
    })
    organizationCommentLike: OrganizationCommentLike,
  ): Promise<void> {
    await this.organizationCommentLikeRepository.updateById(id, organizationCommentLike);
  }

  @put('/organization-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'OrganizationCommentLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() organizationCommentLike: OrganizationCommentLike,
  ): Promise<void> {
    await this.organizationCommentLikeRepository.replaceById(id, organizationCommentLike);
  }

  @del('/organization-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'OrganizationCommentLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.organizationCommentLikeRepository.deleteById(id);
  }
}
