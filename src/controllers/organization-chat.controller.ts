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
import {OrganizationChat} from '../models';
import {OrganizationChatRepository} from '../repositories';

export class OrganizationChatController {
  constructor(
    @repository(OrganizationChatRepository)
    public organizationChatRepository : OrganizationChatRepository,
  ) {}

  @post('/organization-chats', {
    responses: {
      '200': {
        description: 'OrganizationChat model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrganizationChat)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationChat, {
            title: 'NewOrganizationChat',
            exclude: ['id'],
          }),
        },
      },
    })
    organizationChat: Omit<OrganizationChat, 'id'>,
  ): Promise<OrganizationChat> {
    return this.organizationChatRepository.create(organizationChat);
  }

  @get('/organization-chats/count', {
    responses: {
      '200': {
        description: 'OrganizationChat model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(OrganizationChat) where?: Where<OrganizationChat>,
  ): Promise<Count> {
    return this.organizationChatRepository.count(where);
  }

  @get('/organization-chats', {
    responses: {
      '200': {
        description: 'Array of OrganizationChat model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OrganizationChat, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OrganizationChat) filter?: Filter<OrganizationChat>,
  ): Promise<OrganizationChat[]> {
    return this.organizationChatRepository.find(filter);
  }

  @patch('/organization-chats', {
    responses: {
      '200': {
        description: 'OrganizationChat PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationChat, {partial: true}),
        },
      },
    })
    organizationChat: OrganizationChat,
    @param.where(OrganizationChat) where?: Where<OrganizationChat>,
  ): Promise<Count> {
    return this.organizationChatRepository.updateAll(organizationChat, where);
  }

  @get('/organization-chats/{id}', {
    responses: {
      '200': {
        description: 'OrganizationChat model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OrganizationChat, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrganizationChat, {exclude: 'where'}) filter?: FilterExcludingWhere<OrganizationChat>
  ): Promise<OrganizationChat> {
    return this.organizationChatRepository.findById(id, filter);
  }

  @patch('/organization-chats/{id}', {
    responses: {
      '204': {
        description: 'OrganizationChat PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationChat, {partial: true}),
        },
      },
    })
    organizationChat: OrganizationChat,
  ): Promise<void> {
    await this.organizationChatRepository.updateById(id, organizationChat);
  }

  @put('/organization-chats/{id}', {
    responses: {
      '204': {
        description: 'OrganizationChat PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() organizationChat: OrganizationChat,
  ): Promise<void> {
    await this.organizationChatRepository.replaceById(id, organizationChat);
  }

  @del('/organization-chats/{id}', {
    responses: {
      '204': {
        description: 'OrganizationChat DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.organizationChatRepository.deleteById(id);
  }
}
