import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserComment,
  User,
} from '../models';
import {UserCommentRepository} from '../repositories';

export class UserCommentUserController {
  constructor(
    @repository(UserCommentRepository)
    public userCommentRepository: UserCommentRepository,
  ) { }

  @get('/user-comments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to UserComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof UserComment.prototype.id,
  ): Promise<User> {
    return this.userCommentRepository.creator(id);
  }
}
