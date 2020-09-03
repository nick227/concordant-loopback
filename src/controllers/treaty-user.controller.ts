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
  User,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyUserController {
  constructor(
    @repository(TreatyRepository)
    public treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Treaty',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Treaty.prototype.id,
  ): Promise<User> {
    return this.treatyRepository.creator(id);
  }
}
