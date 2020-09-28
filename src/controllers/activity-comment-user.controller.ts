import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ActivityComment,
  User,
} from '../models';
import {ActivityCommentRepository} from '../repositories';

export class ActivityCommentUserController {
  constructor(
    @repository(ActivityCommentRepository)
    public activityCommentRepository: ActivityCommentRepository,
  ) { }

  @get('/activity-comments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to ActivityComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof ActivityComment.prototype.id,
  ): Promise<User> {
    return this.activityCommentRepository.creator(id);
  }
}
