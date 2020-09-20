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
  Conflict,
} from '../models';
import {DebateRepository} from '../repositories';

export class DebateConflictController {
  constructor(
    @repository(DebateRepository)
    public debateRepository: DebateRepository,
  ) { }

  @get('/debates/{id}/conflict', {
    responses: {
      '200': {
        description: 'Conflict belonging to Debate',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conflict)},
          },
        },
      },
    },
  })
  async getConflict(
    @param.path.number('id') id: typeof Debate.prototype.id,
  ): Promise<Conflict> {
    return this.debateRepository.conflict(id);
  }
}
