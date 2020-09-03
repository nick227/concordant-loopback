import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TreatyComment,
  User,
} from '../models';
import {TreatyCommentRepository} from '../repositories';

export class TreatyCommentUserController {
  constructor(
    @repository(TreatyCommentRepository)
    public treatyCommentRepository: TreatyCommentRepository,
  ) { }

  @get('/treaty-comments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to TreatyComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof TreatyComment.prototype.id,
  ): Promise<User> {
    return this.treatyCommentRepository.creator(id);
  }
}
