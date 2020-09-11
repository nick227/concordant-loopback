import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  GrievanceLike,
  User,
} from '../models';
import {GrievanceLikeRepository} from '../repositories';

export class GrievanceLikeUserController {
  constructor(
    @repository(GrievanceLikeRepository)
    public grievanceLikeRepository: GrievanceLikeRepository,
  ) { }

  @get('/grievance-likes/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to GrievanceLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof GrievanceLike.prototype.id,
  ): Promise<User> {
    return this.grievanceLikeRepository.creator(id);
  }
}
