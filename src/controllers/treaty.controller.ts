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
import {Treaty} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyController {
  constructor(
    @repository(TreatyRepository)
    public treatyRepository : TreatyRepository,
  ) {}

  @post('/treaties', {
    responses: {
      '200': {
        description: 'Treaty model instance',
        content: {'application/json': {schema: getModelSchemaRef(Treaty)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Treaty, {
            title: 'NewTreaty',
            exclude: ['id'],
          }),
        },
      },
    })
    treaty: Omit<Treaty, 'id'>,
  ): Promise<Treaty> {
    return this.treatyRepository.create(treaty);
  }

  @get('/treaties/count', {
    responses: {
      '200': {
        description: 'Treaty model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Treaty) where?: Where<Treaty>,
  ): Promise<Count> {
    return this.treatyRepository.count(where);
  }

  @get('/treaties', {
    responses: {
      '200': {
        description: 'Array of Treaty model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Treaty, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Treaty) filter?: Filter<Treaty>,
  ): Promise<Treaty[]> {
    return this.treatyRepository.find(filter);
  }

  @patch('/treaties', {
    responses: {
      '200': {
        description: 'Treaty PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Treaty, {partial: true}),
        },
      },
    })
    treaty: Treaty,
    @param.where(Treaty) where?: Where<Treaty>,
  ): Promise<Count> {
    return this.treatyRepository.updateAll(treaty, where);
  }

  @get('/treaties/{id}', {
    responses: {
      '200': {
        description: 'Treaty model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Treaty, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Treaty, {exclude: 'where'}) filter?: FilterExcludingWhere<Treaty>
  ): Promise<Treaty> {
    return this.treatyRepository.findById(id, filter);
  }

  @patch('/treaties/{id}', {
    responses: {
      '204': {
        description: 'Treaty PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Treaty, {partial: true}),
        },
      },
    })
    treaty: Treaty,
  ): Promise<void> {
    await this.treatyRepository.updateById(id, treaty);
  }

  @put('/treaties/{id}', {
    responses: {
      '204': {
        description: 'Treaty PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() treaty: Treaty,
  ): Promise<void> {
    await this.treatyRepository.replaceById(id, treaty);
  }

  @del('/treaties/{id}', {
    responses: {
      '204': {
        description: 'Treaty DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.treatyRepository.deleteById(id);
  }
}
