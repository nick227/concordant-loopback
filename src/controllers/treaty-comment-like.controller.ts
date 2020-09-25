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
import {TreatyCommentLike} from '../models';
import {TreatyCommentLikeRepository} from '../repositories';

export class TreatyCommentLikeController {
  constructor(
    @repository(TreatyCommentLikeRepository)
    public treatyCommentLikeRepository : TreatyCommentLikeRepository,
  ) {}

  @post('/treaty-comment-likes', {
    responses: {
      '200': {
        description: 'TreatyCommentLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreatyCommentLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyCommentLike, {
            title: 'NewTreatyCommentLike',
            exclude: ['id'],
          }),
        },
      },
    })
    treatyCommentLike: Omit<TreatyCommentLike, 'id'>,
  ): Promise<TreatyCommentLike> {
    return this.treatyCommentLikeRepository.create(treatyCommentLike);
  }

  @get('/treaty-comment-likes/count', {
    responses: {
      '200': {
        description: 'TreatyCommentLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TreatyCommentLike) where?: Where<TreatyCommentLike>,
  ): Promise<Count> {
    return this.treatyCommentLikeRepository.count(where);
  }

  @get('/treaty-comment-likes', {
    responses: {
      '200': {
        description: 'Array of TreatyCommentLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TreatyCommentLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TreatyCommentLike) filter?: Filter<TreatyCommentLike>,
  ): Promise<TreatyCommentLike[]> {
    return this.treatyCommentLikeRepository.find(filter);
  }

  @patch('/treaty-comment-likes', {
    responses: {
      '200': {
        description: 'TreatyCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyCommentLike, {partial: true}),
        },
      },
    })
    treatyCommentLike: TreatyCommentLike,
    @param.where(TreatyCommentLike) where?: Where<TreatyCommentLike>,
  ): Promise<Count> {
    return this.treatyCommentLikeRepository.updateAll(treatyCommentLike, where);
  }

  @get('/treaty-comment-likes/{id}', {
    responses: {
      '200': {
        description: 'TreatyCommentLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TreatyCommentLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TreatyCommentLike, {exclude: 'where'}) filter?: FilterExcludingWhere<TreatyCommentLike>
  ): Promise<TreatyCommentLike> {
    return this.treatyCommentLikeRepository.findById(id, filter);
  }

  @patch('/treaty-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'TreatyCommentLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyCommentLike, {partial: true}),
        },
      },
    })
    treatyCommentLike: TreatyCommentLike,
  ): Promise<void> {
    await this.treatyCommentLikeRepository.updateById(id, treatyCommentLike);
  }

  @put('/treaty-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'TreatyCommentLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() treatyCommentLike: TreatyCommentLike,
  ): Promise<void> {
    await this.treatyCommentLikeRepository.replaceById(id, treatyCommentLike);
  }

  @del('/treaty-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'TreatyCommentLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.treatyCommentLikeRepository.deleteById(id);
  }
}
