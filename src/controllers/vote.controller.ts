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
import {Vote} from '../models';
import {VoteRepository} from '../repositories';

export class VoteController {
  constructor(
    @repository(VoteRepository)
    public voteRepository : VoteRepository,
  ) {}

  @post('/votes', {
    responses: {
      '200': {
        description: 'Vote model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vote)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {
            title: 'NewVote',
            exclude: ['id'],
          }),
        },
      },
    })
    vote: Omit<Vote, 'id'>,
  ): Promise<Vote> {
    return this.voteRepository.create(vote);
  }

  @get('/votes/count', {
    responses: {
      '200': {
        description: 'Vote model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Vote) where?: Where<Vote>,
  ): Promise<Count> {
    return this.voteRepository.count(where);
  }

  @get('/votes', {
    responses: {
      '200': {
        description: 'Array of Vote model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Vote, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Vote) filter?: Filter<Vote>,
  ): Promise<Vote[]> {
    return this.voteRepository.find(filter);
  }

  @patch('/votes', {
    responses: {
      '200': {
        description: 'Vote PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {partial: true}),
        },
      },
    })
    vote: Vote,
    @param.where(Vote) where?: Where<Vote>,
  ): Promise<Count> {
    return this.voteRepository.updateAll(vote, where);
  }

  @get('/votes/{id}', {
    responses: {
      '200': {
        description: 'Vote model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vote, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Vote, {exclude: 'where'}) filter?: FilterExcludingWhere<Vote>
  ): Promise<Vote> {
    return this.voteRepository.findById(id, filter);
  }

  @patch('/votes/{id}', {
    responses: {
      '204': {
        description: 'Vote PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {partial: true}),
        },
      },
    })
    vote: Vote,
  ): Promise<void> {
    await this.voteRepository.updateById(id, vote);
  }

  @put('/votes/{id}', {
    responses: {
      '204': {
        description: 'Vote PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vote: Vote,
  ): Promise<void> {
    await this.voteRepository.replaceById(id, vote);
  }

  @del('/votes/{id}', {
    responses: {
      '204': {
        description: 'Vote DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.voteRepository.deleteById(id);
  }
}
