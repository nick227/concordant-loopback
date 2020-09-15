import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vote,
  Organization,
} from '../models';
import {VoteRepository} from '../repositories';

export class VoteOrganizationController {
  constructor(
    @repository(VoteRepository)
    public voteRepository: VoteRepository,
  ) { }

  @get('/votes/{id}/organization', {
    responses: {
      '200': {
        description: 'Organization belonging to Vote',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async getOrganization(
    @param.path.number('id') id: typeof Vote.prototype.id,
  ): Promise<Organization> {
    return this.voteRepository.organization(id);
  }
}
