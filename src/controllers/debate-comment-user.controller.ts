import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DebateComment,
  User,
} from '../models';
import {DebateCommentRepository} from '../repositories';

export class DebateCommentUserController {
  constructor(
    @repository(DebateCommentRepository)
    public debateCommentRepository: DebateCommentRepository,
  ) { }

  @get('/debate-comments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to DebateComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof DebateComment.prototype.id,
  ): Promise<User> {
    return this.debateCommentRepository.creator(id);
  }
}
