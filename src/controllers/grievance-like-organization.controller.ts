import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  GrievanceLike,
  Organization,
} from '../models';
import {GrievanceLikeRepository} from '../repositories';

export class GrievanceLikeOrganizationController {
  constructor(
    @repository(GrievanceLikeRepository)
    public grievanceLikeRepository: GrievanceLikeRepository,
  ) { }

  @get('/grievance-likes/{id}/organization', {
    responses: {
      '200': {
        description: 'Organization belonging to GrievanceLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async getOrganization(
    @param.path.number('id') id: typeof GrievanceLike.prototype.id,
  ): Promise<Organization> {
    return this.grievanceLikeRepository.organization(id);
  }
}
