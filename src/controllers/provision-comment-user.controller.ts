import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProvisionComment,
  User,
} from '../models';
import {ProvisionCommentRepository} from '../repositories';

export class ProvisionCommentUserController {
  constructor(
    @repository(ProvisionCommentRepository)
    public provisionCommentRepository: ProvisionCommentRepository,
  ) { }

  @get('/provision-comments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to ProvisionComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof ProvisionComment.prototype.id,
  ): Promise<User> {
    return this.provisionCommentRepository.creator(id);
  }
}
