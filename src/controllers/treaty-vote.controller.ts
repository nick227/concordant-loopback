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
  Treaty,
  Vote,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyVoteController {
  constructor(
    @repository(TreatyRepository) protected treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/votes', {
    responses: {
      '200': {
        description: 'Array of Treaty has many Vote',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vote)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vote>,
  ): Promise<Vote[]> {
    return this.treatyRepository.votes(id).find(filter);
  }

  @post('/treaties/{id}/votes', {
    responses: {
      '200': {
        description: 'Treaty model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vote)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Treaty.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {
            title: 'NewVoteInTreaty',
            exclude: ['id'],
            optional: ['treaty_id']
          }),
        },
      },
    }) vote: Omit<Vote, 'id'>,
  ): Promise<Vote> {
    return this.treatyRepository.votes(id).create(vote);
  }

  @patch('/treaties/{id}/votes', {
    responses: {
      '200': {
        description: 'Treaty.Vote PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {partial: true}),
        },
      },
    })
    vote: Partial<Vote>,
    @param.query.object('where', getWhereSchemaFor(Vote)) where?: Where<Vote>,
  ): Promise<Count> {
    return this.treatyRepository.votes(id).patch(vote, where);
  }

  @del('/treaties/{id}/votes', {
    responses: {
      '200': {
        description: 'Treaty.Vote DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vote)) where?: Where<Vote>,
  ): Promise<Count> {
    return this.treatyRepository.votes(id).delete(where);
  }
}
