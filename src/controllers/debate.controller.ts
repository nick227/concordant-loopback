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
import {Debate} from '../models';
import {DebateRepository} from '../repositories';

export class DebateController {
  constructor(
    @repository(DebateRepository)
    public debateRepository : DebateRepository,
  ) {}

  @post('/debates', {
    responses: {
      '200': {
        description: 'Debate model instance',
        content: {'application/json': {schema: getModelSchemaRef(Debate)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debate, {
            title: 'NewDebate',
            exclude: ['id'],
          }),
        },
      },
    })
    debate: Omit<Debate, 'id'>,
  ): Promise<Debate> {
    return this.debateRepository.create(debate);
  }

  @get('/debates/count', {
    responses: {
      '200': {
        description: 'Debate model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Debate) where?: Where<Debate>,
  ): Promise<Count> {
    return this.debateRepository.count(where);
  }

  @get('/debates', {
    responses: {
      '200': {
        description: 'Array of Debate model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Debate, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Debate) filter?: Filter<Debate>,
  ): Promise<Debate[]> {
    return this.debateRepository.find(filter);
  }

  @patch('/debates', {
    responses: {
      '200': {
        description: 'Debate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debate, {partial: true}),
        },
      },
    })
    debate: Debate,
    @param.where(Debate) where?: Where<Debate>,
  ): Promise<Count> {
    return this.debateRepository.updateAll(debate, where);
  }

  @get('/debates/{id}', {
    responses: {
      '200': {
        description: 'Debate model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Debate, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Debate, {exclude: 'where'}) filter?: FilterExcludingWhere<Debate>
  ): Promise<Debate> {
    return this.debateRepository.findById(id, filter);
  }

  @patch('/debates/{id}', {
    responses: {
      '204': {
        description: 'Debate PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debate, {partial: true}),
        },
      },
    })
    debate: Debate,
  ): Promise<void> {
    await this.debateRepository.updateById(id, debate);
  }

  @put('/debates/{id}', {
    responses: {
      '204': {
        description: 'Debate PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() debate: Debate,
  ): Promise<void> {
    await this.debateRepository.replaceById(id, debate);
  }

  @del('/debates/{id}', {
    responses: {
      '204': {
        description: 'Debate DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.debateRepository.deleteById(id);
  }
}
