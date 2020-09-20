import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Debate,
  Organization,
} from '../models';
import {DebateRepository} from '../repositories';

export class DebateOrganizationController {
  constructor(
    @repository(DebateRepository)
    public debateRepository: DebateRepository,
  ) { }

  @get('/debates/{id}/organization', {
    responses: {
      '200': {
        description: 'Organization belonging to Debate',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async getOrganization(
    @param.path.number('id') id: typeof Debate.prototype.id,
  ): Promise<Organization> {
    return this.debateRepository.organization(id);
  }
}
