import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Conflict,
  Debate,
} from '../models';
import {ConflictRepository} from '../repositories';

export class ConflictDebateController {
  constructor(
    @repository(ConflictRepository) protected conflictRepository: ConflictRepository,
  ) { }

  @get('/conflicts/{id}/debates', {
    responses: {
      '200': {
        description: 'Array of Conflict has many Debate',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Debate)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Debate>,
  ): Promise<Debate[]> {
    return this.conflictRepository.debates(id).find(filter);
  }

  @post('/conflicts/{id}/debates', {
    responses: {
      '200': {
        description: 'Conflict model instance',
        content: {'application/json': {schema: getModelSchemaRef(Debate)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conflict.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debate, {
            title: 'NewDebateInConflict',
            exclude: ['id'],
            optional: ['conflict_id']
          }),
        },
      },
    }) debate: Omit<Debate, 'id'>,
  ): Promise<Debate> {
    return this.conflictRepository.debates(id).create(debate);
  }

  @patch('/conflicts/{id}/debates', {
    responses: {
      '200': {
        description: 'Conflict.Debate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debate, {partial: true}),
        },
      },
    })
    debate: Partial<Debate>,
    @param.query.object('where', getWhereSchemaFor(Debate)) where?: Where<Debate>,
  ): Promise<Count> {
    return this.conflictRepository.debates(id).patch(debate, where);
  }

  @del('/conflicts/{id}/debates', {
    responses: {
      '200': {
        description: 'Conflict.Debate DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Debate)) where?: Where<Debate>,
  ): Promise<Count> {
    return this.conflictRepository.debates(id).delete(where);
  }
}
