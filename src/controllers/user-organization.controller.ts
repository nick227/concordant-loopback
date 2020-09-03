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
User,
UserToOrganization,
Organization,
} from '../models';
import {UserRepository} from '../repositories';

export class UserOrganizationController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/organizations', {
    responses: {
      '200': {
        description: 'Array of User has many Organization through UserToOrganization',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Organization>,
  ): Promise<Organization[]> {
    return this.userRepository.organizations(id).find(filter);
  }

  @post('/users/{id}/organizations', {
    responses: {
      '200': {
        description: 'create a Organization model instance',
        content: {'application/json': {schema: getModelSchemaRef(Organization)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organization, {
            title: 'NewOrganizationInUser',
            exclude: ['id'],
          }),
        },
      },
    }) organization: Omit<Organization, 'id'>,
  ): Promise<Organization> {
    return this.userRepository.organizations(id).create(organization);
  }

  @patch('/users/{id}/organizations', {
    responses: {
      '200': {
        description: 'User.Organization PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organization, {partial: true}),
        },
      },
    })
    organization: Partial<Organization>,
    @param.query.object('where', getWhereSchemaFor(Organization)) where?: Where<Organization>,
  ): Promise<Count> {
    return this.userRepository.organizations(id).patch(organization, where);
  }

  @del('/users/{id}/organizations', {
    responses: {
      '200': {
        description: 'User.Organization DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Organization)) where?: Where<Organization>,
  ): Promise<Count> {
    return this.userRepository.organizations(id).delete(where);
  }
}
