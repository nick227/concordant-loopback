import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grievance,
  Organization,
} from '../models';
import {GrievanceRepository} from '../repositories';

export class GrievanceOrganizationController {
  constructor(
    @repository(GrievanceRepository)
    public grievanceRepository: GrievanceRepository,
  ) { }

  @get('/grievances/{id}/organization', {
    responses: {
      '200': {
        description: 'Organization belonging to Grievance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async getOrganization(
    @param.path.number('id') id: typeof Grievance.prototype.id,
  ): Promise<Organization> {
    return this.grievanceRepository.organization(id);
  }
}
