import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grievance,
  User,
} from '../models';
import {GrievanceRepository} from '../repositories';

export class GrievanceUserController {
  constructor(
    @repository(GrievanceRepository)
    public grievanceRepository: GrievanceRepository,
  ) { }

  @get('/grievances/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Grievance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Grievance.prototype.id,
  ): Promise<User> {
    return this.grievanceRepository.creator(id);
  }
}
