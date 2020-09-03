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
import {TreatyComment} from '../models';
import {TreatyCommentRepository} from '../repositories';

export class TreatyCommentController {
  constructor(
    @repository(TreatyCommentRepository)
    public treatyCommentRepository : TreatyCommentRepository,
  ) {}

  @post('/treaty-comments', {
    responses: {
      '200': {
        description: 'TreatyComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreatyComment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyComment, {
            title: 'NewTreatyComment',
            exclude: ['id'],
          }),
        },
      },
    })
    treatyComment: Omit<TreatyComment, 'id'>,
  ): Promise<TreatyComment> {
    return this.treatyCommentRepository.create(treatyComment);
  }

  @get('/treaty-comments/count', {
    responses: {
      '200': {
        description: 'TreatyComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TreatyComment) where?: Where<TreatyComment>,
  ): Promise<Count> {
    return this.treatyCommentRepository.count(where);
  }

  @get('/treaty-comments', {
    responses: {
      '200': {
        description: 'Array of TreatyComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TreatyComment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TreatyComment) filter?: Filter<TreatyComment>,
  ): Promise<TreatyComment[]> {
    return this.treatyCommentRepository.find(filter);
  }

  @patch('/treaty-comments', {
    responses: {
      '200': {
        description: 'TreatyComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyComment, {partial: true}),
        },
      },
    })
    treatyComment: TreatyComment,
    @param.where(TreatyComment) where?: Where<TreatyComment>,
  ): Promise<Count> {
    return this.treatyCommentRepository.updateAll(treatyComment, where);
  }

  @get('/treaty-comments/{id}', {
    responses: {
      '200': {
        description: 'TreatyComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TreatyComment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TreatyComment, {exclude: 'where'}) filter?: FilterExcludingWhere<TreatyComment>
  ): Promise<TreatyComment> {
    return this.treatyCommentRepository.findById(id, filter);
  }

  @patch('/treaty-comments/{id}', {
    responses: {
      '204': {
        description: 'TreatyComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyComment, {partial: true}),
        },
      },
    })
    treatyComment: TreatyComment,
  ): Promise<void> {
    await this.treatyCommentRepository.updateById(id, treatyComment);
  }

  @put('/treaty-comments/{id}', {
    responses: {
      '204': {
        description: 'TreatyComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() treatyComment: TreatyComment,
  ): Promise<void> {
    await this.treatyCommentRepository.replaceById(id, treatyComment);
  }

  @del('/treaty-comments/{id}', {
    responses: {
      '204': {
        description: 'TreatyComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.treatyCommentRepository.deleteById(id);
  }
}
