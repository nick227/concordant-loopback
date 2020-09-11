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
UserToOrganization,
User,
} from '../models';
import {OrganizationRepository} from '../repositories';

export class OrganizationUserController {
  constructor(
    @repository(OrganizationRepository) protected organizationRepository: OrganizationRepository,
  ) { }

  @get('/organizations/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Organization has many User through UserToOrganization',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.organizationRepository.users(id).find(filter);
  }

  @post('/organizations/{id}/users', {
    responses: {
      '200': {
        description: 'create a User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Organization.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInOrganization',
            exclude: ['id'],
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.organizationRepository.users(id).create(user);
  }

  @patch('/organizations/{id}/users', {
    responses: {
      '200': {
        description: 'Organization.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.organizationRepository.users(id).patch(user, where);
  }

  @del('/organizations/{id}/users', {
    responses: {
      '200': {
        description: 'Organization.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.organizationRepository.users(id).delete(where);
  }
}
