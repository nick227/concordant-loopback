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
import {DebateCommentLike} from '../models';
import {DebateCommentLikeRepository} from '../repositories';

export class DebateCommentLikeController {
  constructor(
    @repository(DebateCommentLikeRepository)
    public debateCommentLikeRepository : DebateCommentLikeRepository,
  ) {}

  @post('/debate-comment-likes', {
    responses: {
      '200': {
        description: 'DebateCommentLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(DebateCommentLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateCommentLike, {
            title: 'NewDebateCommentLike',
            exclude: ['id'],
          }),
        },
      },
    })
    debateCommentLike: Omit<DebateCommentLike, 'id'>,
  ): Promise<DebateCommentLike> {
    return this.debateCommentLikeRepository.create(debateCommentLike);
  }

  @get('/debate-comment-likes/count', {
    responses: {
      '200': {
        description: 'DebateCommentLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DebateCommentLike) where?: Where<DebateCommentLike>,
  ): Promise<Count> {
    return this.debateCommentLikeRepository.count(where);
  }

  @get('/debate-comment-likes', {
    responses: {
      '200': {
        description: 'Array of DebateCommentLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DebateCommentLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DebateCommentLike) filter?: Filter<DebateCommentLike>,
  ): Promise<DebateCommentLike[]> {
    return this.debateCommentLikeRepository.find(filter);
  }

  @patch('/debate-comment-likes', {
    responses: {
      '200': {
        description: 'DebateCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateCommentLike, {partial: true}),
        },
      },
    })
    debateCommentLike: DebateCommentLike,
    @param.where(DebateCommentLike) where?: Where<DebateCommentLike>,
  ): Promise<Count> {
    return this.debateCommentLikeRepository.updateAll(debateCommentLike, where);
  }

  @get('/debate-comment-likes/{id}', {
    responses: {
      '200': {
        description: 'DebateCommentLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DebateCommentLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DebateCommentLike, {exclude: 'where'}) filter?: FilterExcludingWhere<DebateCommentLike>
  ): Promise<DebateCommentLike> {
    return this.debateCommentLikeRepository.findById(id, filter);
  }

  @patch('/debate-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'DebateCommentLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebateCommentLike, {partial: true}),
        },
      },
    })
    debateCommentLike: DebateCommentLike,
  ): Promise<void> {
    await this.debateCommentLikeRepository.updateById(id, debateCommentLike);
  }

  @put('/debate-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'DebateCommentLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() debateCommentLike: DebateCommentLike,
  ): Promise<void> {
    await this.debateCommentLikeRepository.replaceById(id, debateCommentLike);
  }

  @del('/debate-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'DebateCommentLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.debateCommentLikeRepository.deleteById(id);
  }
}
