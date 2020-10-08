import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {UserAchievement} from '../models';
import {UserAchievementRepository} from '../repositories';

export class UserAchievementController {
  constructor(
    @repository(UserAchievementRepository)
    public userAchievementRepository : UserAchievementRepository,
  ) {}

  @post('/user-achievements', {
    responses: {
      '200': {
        description: 'UserAchievement model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserAchievement)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAchievement, {
            title: 'NewUserAchievement',
            exclude: ['id'],
          }),
        },
      },
    })
    userAchievement: Omit<UserAchievement, 'id'>,
  ): Promise<UserAchievement> {
    return this.userAchievementRepository.create(userAchievement);
  }

  @get('/user-achievements/count', {
    responses: {
      '200': {
        description: 'UserAchievement model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserAchievement) where?: Where<UserAchievement>,
  ): Promise<Count> {
    return this.userAchievementRepository.count(where);
  }

  @get('/user-achievements', {
    responses: {
      '200': {
        description: 'Array of UserAchievement model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserAchievement, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserAchievement) filter?: Filter<UserAchievement>,
  ): Promise<UserAchievement[]> {
    return this.userAchievementRepository.find(filter);
  }

  @patch('/user-achievements', {
    responses: {
      '200': {
        description: 'UserAchievement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAchievement, {partial: true}),
        },
      },
    })
    userAchievement: UserAchievement,
    @param.where(UserAchievement) where?: Where<UserAchievement>,
  ): Promise<Count> {
    return this.userAchievementRepository.updateAll(userAchievement, where);
  }

  @get('/user-achievements/{id}', {
    responses: {
      '200': {
        description: 'UserAchievement model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserAchievement, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserAchievement, {exclude: 'where'}) filter?: FilterExcludingWhere<UserAchievement>
  ): Promise<UserAchievement> {
    return this.userAchievementRepository.findById(id, filter);
  }

  @patch('/user-achievements/{id}', {
    responses: {
      '204': {
        description: 'UserAchievement PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAchievement, {partial: true}),
        },
      },
    })
    userAchievement: UserAchievement,
  ): Promise<void> {
    await this.userAchievementRepository.updateById(id, userAchievement);
  }

  @put('/user-achievements/{id}', {
    responses: {
      '204': {
        description: 'UserAchievement PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userAchievement: UserAchievement,
  ): Promise<void> {
    await this.userAchievementRepository.replaceById(id, userAchievement);
  }

  @del('/user-achievements/{id}', {
    responses: {
      '204': {
        description: 'UserAchievement DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userAchievementRepository.deleteById(id);
  }
}
