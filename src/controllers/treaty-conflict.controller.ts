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
  Conflict,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyConflictController {
  constructor(
    @repository(TreatyRepository)
    public treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/conflict', {
    responses: {
      '200': {
        description: 'Conflict belonging to Treaty',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conflict)},
          },
        },
      },
    },
  })
  async getConflict(
    @param.path.number('id') id: typeof Treaty.prototype.id,
  ): Promise<Conflict> {
    return this.treatyRepository.conflict(id);
  }
}
