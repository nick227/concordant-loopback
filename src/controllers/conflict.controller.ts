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
import {Conflict} from '../models';
import {ConflictRepository} from '../repositories';

export class ConflictController {
  constructor(
    @repository(ConflictRepository)
    public conflictRepository : ConflictRepository,
  ) {}

  @post('/conflicts', {
    responses: {
      '200': {
        description: 'Conflict model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conflict)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conflict, {
            title: 'NewConflict',
            exclude: ['id'],
          }),
        },
      },
    })
    conflict: Omit<Conflict, 'id'>,
  ): Promise<Conflict> {
    return this.conflictRepository.create(conflict);
  }

  @get('/conflicts/count', {
    responses: {
      '200': {
        description: 'Conflict model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Conflict) where?: Where<Conflict>,
  ): Promise<Count> {
    return this.conflictRepository.count(where);
  }

  @get('/conflicts', {
    responses: {
      '200': {
        description: 'Array of Conflict model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Conflict, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Conflict) filter?: Filter<Conflict>,
  ): Promise<Conflict[]> {
    return this.conflictRepository.find(filter);
  }

  @patch('/conflicts', {
    responses: {
      '200': {
        description: 'Conflict PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conflict, {partial: true}),
        },
      },
    })
    conflict: Conflict,
    @param.where(Conflict) where?: Where<Conflict>,
  ): Promise<Count> {
    return this.conflictRepository.updateAll(conflict, where);
  }

  @get('/conflicts/{id}', {
    responses: {
      '200': {
        description: 'Conflict model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conflict, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Conflict, {exclude: 'where'}) filter?: FilterExcludingWhere<Conflict>
  ): Promise<Conflict> {
    return this.conflictRepository.findById(id, filter);
  }

  @patch('/conflicts/{id}', {
    responses: {
      '204': {
        description: 'Conflict PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conflict, {partial: true}),
        },
      },
    })
    conflict: Conflict,
  ): Promise<void> {
    await this.conflictRepository.updateById(id, conflict);
  }

  @put('/conflicts/{id}', {
    responses: {
      '204': {
        description: 'Conflict PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() conflict: Conflict,
  ): Promise<void> {
    await this.conflictRepository.replaceById(id, conflict);
  }

  @del('/conflicts/{id}', {
    responses: {
      '204': {
        description: 'Conflict DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.conflictRepository.deleteById(id);
  }
}
