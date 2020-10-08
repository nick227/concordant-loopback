import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserAchievement,
  AchievementType,
} from '../models';
import {UserAchievementRepository} from '../repositories';

export class UserAchievementAchievementTypeController {
  constructor(
    @repository(UserAchievementRepository)
    public userAchievementRepository: UserAchievementRepository,
  ) { }

  @get('/user-achievements/{id}/achievement-type', {
    responses: {
      '200': {
        description: 'AchievementType belonging to UserAchievement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AchievementType)},
          },
        },
      },
    },
  })
  async getAchievementType(
    @param.path.number('id') id: typeof UserAchievement.prototype.id,
  ): Promise<AchievementType> {
    return this.userAchievementRepository.type(id);
  }
}
