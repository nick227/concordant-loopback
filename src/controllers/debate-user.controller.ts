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
  User,
} from '../models';
import {DebateRepository} from '../repositories';

export class DebateUserController {
  constructor(
    @repository(DebateRepository)
    public debateRepository: DebateRepository,
  ) { }

  @get('/debates/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Debate',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Debate.prototype.id,
  ): Promise<User> {
    return this.debateRepository.creator(id);
  }
}
