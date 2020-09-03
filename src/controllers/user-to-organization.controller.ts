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
import {UserToOrganization} from '../models';
import {UserToOrganizationRepository} from '../repositories';

export class UserToOrganizationController {
  constructor(
    @repository(UserToOrganizationRepository)
    public userToOrganizationRepository : UserToOrganizationRepository,
  ) {}

  @post('/user-to-organizations', {
    responses: {
      '200': {
        description: 'UserToOrganization model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserToOrganization)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserToOrganization, {
            title: 'NewUserToOrganization',
            exclude: ['id'],
          }),
        },
      },
    })
    userToOrganization: Omit<UserToOrganization, 'id'>,
  ): Promise<UserToOrganization> {
    return this.userToOrganizationRepository.create(userToOrganization);
  }

  @get('/user-to-organizations/count', {
    responses: {
      '200': {
        description: 'UserToOrganization model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserToOrganization) where?: Where<UserToOrganization>,
  ): Promise<Count> {
    return this.userToOrganizationRepository.count(where);
  }

  @get('/user-to-organizations', {
    responses: {
      '200': {
        description: 'Array of UserToOrganization model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserToOrganization, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserToOrganization) filter?: Filter<UserToOrganization>,
  ): Promise<UserToOrganization[]> {
    return this.userToOrganizationRepository.find(filter);
  }

  @patch('/user-to-organizations', {
    responses: {
      '200': {
        description: 'UserToOrganization PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserToOrganization, {partial: true}),
        },
      },
    })
    userToOrganization: UserToOrganization,
    @param.where(UserToOrganization) where?: Where<UserToOrganization>,
  ): Promise<Count> {
    return this.userToOrganizationRepository.updateAll(userToOrganization, where);
  }

  @get('/user-to-organizations/{id}', {
    responses: {
      '200': {
        description: 'UserToOrganization model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserToOrganization, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserToOrganization, {exclude: 'where'}) filter?: FilterExcludingWhere<UserToOrganization>
  ): Promise<UserToOrganization> {
    return this.userToOrganizationRepository.findById(id, filter);
  }

  @patch('/user-to-organizations/{id}', {
    responses: {
      '204': {
        description: 'UserToOrganization PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserToOrganization, {partial: true}),
        },
      },
    })
    userToOrganization: UserToOrganization,
  ): Promise<void> {
    await this.userToOrganizationRepository.updateById(id, userToOrganization);
  }

  @put('/user-to-organizations/{id}', {
    responses: {
      '204': {
        description: 'UserToOrganization PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userToOrganization: UserToOrganization,
  ): Promise<void> {
    await this.userToOrganizationRepository.replaceById(id, userToOrganization);
  }

  @del('/user-to-organizations/{id}', {
    responses: {
      '204': {
        description: 'UserToOrganization DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userToOrganizationRepository.deleteById(id);
  }
}
