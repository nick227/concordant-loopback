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
import {AchievementType} from '../models';
import {AchievementTypeRepository} from '../repositories';

export class AchievementTypeController {
  constructor(
    @repository(AchievementTypeRepository)
    public achievementTypeRepository : AchievementTypeRepository,
  ) {}

  @post('/achievement-types', {
    responses: {
      '200': {
        description: 'AchievementType model instance',
        content: {'application/json': {schema: getModelSchemaRef(AchievementType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AchievementType, {
            title: 'NewAchievementType',
            exclude: ['id'],
          }),
        },
      },
    })
    achievementType: Omit<AchievementType, 'id'>,
  ): Promise<AchievementType> {
    return this.achievementTypeRepository.create(achievementType);
  }

  @get('/achievement-types/count', {
    responses: {
      '200': {
        description: 'AchievementType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AchievementType) where?: Where<AchievementType>,
  ): Promise<Count> {
    return this.achievementTypeRepository.count(where);
  }

  @get('/achievement-types', {
    responses: {
      '200': {
        description: 'Array of AchievementType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AchievementType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AchievementType) filter?: Filter<AchievementType>,
  ): Promise<AchievementType[]> {
    return this.achievementTypeRepository.find(filter);
  }

  @patch('/achievement-types', {
    responses: {
      '200': {
        description: 'AchievementType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AchievementType, {partial: true}),
        },
      },
    })
    achievementType: AchievementType,
    @param.where(AchievementType) where?: Where<AchievementType>,
  ): Promise<Count> {
    return this.achievementTypeRepository.updateAll(achievementType, where);
  }

  @get('/achievement-types/{id}', {
    responses: {
      '200': {
        description: 'AchievementType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AchievementType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AchievementType, {exclude: 'where'}) filter?: FilterExcludingWhere<AchievementType>
  ): Promise<AchievementType> {
    return this.achievementTypeRepository.findById(id, filter);
  }

  @patch('/achievement-types/{id}', {
    responses: {
      '204': {
        description: 'AchievementType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AchievementType, {partial: true}),
        },
      },
    })
    achievementType: AchievementType,
  ): Promise<void> {
    await this.achievementTypeRepository.updateById(id, achievementType);
  }

  @put('/achievement-types/{id}', {
    responses: {
      '204': {
        description: 'AchievementType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() achievementType: AchievementType,
  ): Promise<void> {
    await this.achievementTypeRepository.replaceById(id, achievementType);
  }

  @del('/achievement-types/{id}', {
    responses: {
      '204': {
        description: 'AchievementType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.achievementTypeRepository.deleteById(id);
  }
}
