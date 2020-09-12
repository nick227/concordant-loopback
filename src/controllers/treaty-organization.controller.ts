import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Treaty,
  Organization,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyOrganizationController {
  constructor(
    @repository(TreatyRepository)
    public treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/organization', {
    responses: {
      '200': {
        description: 'Organization belonging to Treaty',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async getOrganization(
    @param.path.number('id') id: typeof Treaty.prototype.id,
  ): Promise<Organization> {
    return this.treatyRepository.organization_a(id);
  }
}
