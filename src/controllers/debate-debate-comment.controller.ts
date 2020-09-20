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
  Debate,
  DebateComment,
} from '../models';
import {DebateRepository} from '../repositories';

export class DebateDebateCommentController {
  constructor(
    @repository(DebateRepository) protected debateRepository: DebateRepository,
  ) { }

  @get('/debates/{id}/debate-comments', {
    responses: {
      '200': {
        description: 'Array of Debate has many DebateComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DebateComment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DebateComment>,
  ): Promise<DebateComment[]> {
    return this.debateRepository.comments(id).find(filter);
  }

  @post('/debates/{id}/debate-comments', {
    responses: {
      '200': {
        description: 'Debate model instance',
        content: {'application/json': {schema: getModelSchemaRef(DebateComment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Debate.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateComment, {
            title: 'NewDebateCommentInDebate',
            exclude: ['id'],
            optional: ['debate_id']
          }),
        },
      },
    }) debateComment: Omit<DebateComment, 'id'>,
  ): Promise<DebateComment> {
    return this.debateRepository.comments(id).create(debateComment);
  }

  @patch('/debates/{id}/debate-comments', {
    responses: {
      '200': {
        description: 'Debate.DebateComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateComment, {partial: true}),
        },
      },
    })
    debateComment: Partial<DebateComment>,
    @param.query.object('where', getWhereSchemaFor(DebateComment)) where?: Where<DebateComment>,
  ): Promise<Count> {
    return this.debateRepository.comments(id).patch(debateComment, where);
  }

  @del('/debates/{id}/debate-comments', {
    responses: {
      '200': {
        description: 'Debate.DebateComment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DebateComment)) where?: Where<DebateComment>,
  ): Promise<Count> {
    return this.debateRepository.comments(id).delete(where);
  }
}
