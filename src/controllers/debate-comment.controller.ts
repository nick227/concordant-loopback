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
import {DebateComment} from '../models';
import {DebateCommentRepository} from '../repositories';

export class DebateCommentController {
  constructor(
    @repository(DebateCommentRepository)
    public debateCommentRepository : DebateCommentRepository,
  ) {}

  @post('/debate-comments', {
    responses: {
      '200': {
        description: 'DebateComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(DebateComment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateComment, {
            title: 'NewDebateComment',
            exclude: ['id'],
          }),
        },
      },
    })
    debateComment: Omit<DebateComment, 'id'>,
  ): Promise<DebateComment> {
    return this.debateCommentRepository.create(debateComment);
  }

  @get('/debate-comments/count', {
    responses: {
      '200': {
        description: 'DebateComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DebateComment) where?: Where<DebateComment>,
  ): Promise<Count> {
    return this.debateCommentRepository.count(where);
  }

  @get('/debate-comments', {
    responses: {
      '200': {
        description: 'Array of DebateComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DebateComment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DebateComment) filter?: Filter<DebateComment>,
  ): Promise<DebateComment[]> {
    return this.debateCommentRepository.find(filter);
  }

  @patch('/debate-comments', {
    responses: {
      '200': {
        description: 'DebateComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateComment, {partial: true}),
        },
      },
    })
    debateComment: DebateComment,
    @param.where(DebateComment) where?: Where<DebateComment>,
  ): Promise<Count> {
    return this.debateCommentRepository.updateAll(debateComment, where);
  }

  @get('/debate-comments/{id}', {
    responses: {
      '200': {
        description: 'DebateComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DebateComment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DebateComment, {exclude: 'where'}) filter?: FilterExcludingWhere<DebateComment>
  ): Promise<DebateComment> {
    return this.debateCommentRepository.findById(id, filter);
  }

  @patch('/debate-comments/{id}', {
    responses: {
      '204': {
        description: 'DebateComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateComment, {partial: true}),
        },
      },
    })
    debateComment: DebateComment,
  ): Promise<void> {
    await this.debateCommentRepository.updateById(id, debateComment);
  }

  @put('/debate-comments/{id}', {
    responses: {
      '204': {
        description: 'DebateComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() debateComment: DebateComment,
  ): Promise<void> {
    await this.debateCommentRepository.replaceById(id, debateComment);
  }

  @del('/debate-comments/{id}', {
    responses: {
      '204': {
        description: 'DebateComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.debateCommentRepository.deleteById(id);
  }
}
