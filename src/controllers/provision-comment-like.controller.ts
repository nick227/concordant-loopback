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
import {ProvisionCommentLike} from '../models';
import {ProvisionCommentLikeRepository} from '../repositories';

export class ProvisionCommentLikeController {
  constructor(
    @repository(ProvisionCommentLikeRepository)
    public provisionCommentLikeRepository : ProvisionCommentLikeRepository,
  ) {}

  @post('/provision-comment-likes', {
    responses: {
      '200': {
        description: 'ProvisionCommentLike model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProvisionCommentLike)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionCommentLike, {
            title: 'NewProvisionCommentLike',
            exclude: ['id'],
          }),
        },
      },
    })
    provisionCommentLike: Omit<ProvisionCommentLike, 'id'>,
  ): Promise<ProvisionCommentLike> {
    return this.provisionCommentLikeRepository.create(provisionCommentLike);
  }

  @get('/provision-comment-likes/count', {
    responses: {
      '200': {
        description: 'ProvisionCommentLike model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ProvisionCommentLike) where?: Where<ProvisionCommentLike>,
  ): Promise<Count> {
    return this.provisionCommentLikeRepository.count(where);
  }

  @get('/provision-comment-likes', {
    responses: {
      '200': {
        description: 'Array of ProvisionCommentLike model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProvisionCommentLike, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ProvisionCommentLike) filter?: Filter<ProvisionCommentLike>,
  ): Promise<ProvisionCommentLike[]> {
    return this.provisionCommentLikeRepository.find(filter);
  }

  @patch('/provision-comment-likes', {
    responses: {
      '200': {
        description: 'ProvisionCommentLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionCommentLike, {partial: true}),
        },
      },
    })
    provisionCommentLike: ProvisionCommentLike,
    @param.where(ProvisionCommentLike) where?: Where<ProvisionCommentLike>,
  ): Promise<Count> {
    return this.provisionCommentLikeRepository.updateAll(provisionCommentLike, where);
  }

  @get('/provision-comment-likes/{id}', {
    responses: {
      '200': {
        description: 'ProvisionCommentLike model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProvisionCommentLike, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProvisionCommentLike, {exclude: 'where'}) filter?: FilterExcludingWhere<ProvisionCommentLike>
  ): Promise<ProvisionCommentLike> {
    return this.provisionCommentLikeRepository.findById(id, filter);
  }

  @patch('/provision-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'ProvisionCommentLike PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionCommentLike, {partial: true}),
        },
      },
    })
    provisionCommentLike: ProvisionCommentLike,
  ): Promise<void> {
    await this.provisionCommentLikeRepository.updateById(id, provisionCommentLike);
  }

  @put('/provision-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'ProvisionCommentLike PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() provisionCommentLike: ProvisionCommentLike,
  ): Promise<void> {
    await this.provisionCommentLikeRepository.replaceById(id, provisionCommentLike);
  }

  @del('/provision-comment-likes/{id}', {
    responses: {
      '204': {
        description: 'ProvisionCommentLike DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.provisionCommentLikeRepository.deleteById(id);
  }
}
