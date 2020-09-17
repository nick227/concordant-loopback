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
  TreatyStatus,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyTreatyStatusController {
  constructor(
    @repository(TreatyRepository)
    public treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/treaty-status', {
    responses: {
      '200': {
        description: 'TreatyStatus belonging to Treaty',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TreatyStatus)},
          },
        },
      },
    },
  })
  async getTreatyStatus(
    @param.path.number('id') id: typeof Treaty.prototype.id,
  ): Promise<TreatyStatus> {
    return this.treatyRepository.status(id);
  }
}
