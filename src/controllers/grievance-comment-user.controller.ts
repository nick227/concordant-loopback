import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  GrievanceComment,
  User,
} from '../models';
import {GrievanceCommentRepository} from '../repositories';

export class GrievanceCommentUserController {
  constructor(
    @repository(GrievanceCommentRepository)
    public grievanceCommentRepository: GrievanceCommentRepository,
  ) { }

  @get('/grievance-comments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to GrievanceComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof GrievanceComment.prototype.id,
  ): Promise<User> {
    return this.grievanceCommentRepository.creator(id);
  }
}
