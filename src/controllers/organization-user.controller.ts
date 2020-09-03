import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Organization,
  User,
} from '../models';
import {OrganizationRepository} from '../repositories';

export class OrganizationUserController {
  constructor(
    @repository(OrganizationRepository)
    public organizationRepository: OrganizationRepository,
  ) { }

  @get('/organizations/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Organization',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Organization.prototype.id,
  ): Promise<User> {
    return this.organizationRepository.creator(id);
  }
}
