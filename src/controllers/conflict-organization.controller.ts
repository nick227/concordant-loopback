import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Conflict,
  Organization,
} from '../models';
import {ConflictRepository} from '../repositories';

export class ConflictOrganizationController {
  constructor(
    @repository(ConflictRepository)
    public conflictRepository: ConflictRepository,
  ) { }

  @get('/conflicts/{id}/organization_a', {
    responses: {
      '200': {
        description: 'Organization A belonging to Conflict',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async getOrganizationA(
    @param.path.number('id') id: typeof Conflict.prototype.id,
  ): Promise<Organization> {
    return this.conflictRepository.organization_a(id);
  }

  @get('/conflicts/{id}/organization_b', {
    responses: {
      '200': {
        description: 'Organization B belonging to Conflict',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async getOrganizationB(
    @param.path.number('id') id: typeof Conflict.prototype.id,
  ): Promise<Organization> {
    return this.conflictRepository.organization_b(id);
  }

}
