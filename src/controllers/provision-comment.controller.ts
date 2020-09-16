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
import {ProvisionComment} from '../models';
import {ProvisionCommentRepository} from '../repositories';

export class ProvisionCommentController {
  constructor(
    @repository(ProvisionCommentRepository)
    public provisionCommentRepository : ProvisionCommentRepository,
  ) {}

  @post('/provision-comments', {
    responses: {
      '200': {
        description: 'ProvisionComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProvisionComment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionComment, {
            title: 'NewProvisionComment',
            exclude: ['id'],
          }),
        },
      },
    })
    provisionComment: Omit<ProvisionComment, 'id'>,
  ): Promise<ProvisionComment> {
    return this.provisionCommentRepository.create(provisionComment);
  }

  @get('/provision-comments/count', {
    responses: {
      '200': {
        description: 'ProvisionComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ProvisionComment) where?: Where<ProvisionComment>,
  ): Promise<Count> {
    return this.provisionCommentRepository.count(where);
  }

  @get('/provision-comments', {
    responses: {
      '200': {
        description: 'Array of ProvisionComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProvisionComment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ProvisionComment) filter?: Filter<ProvisionComment>,
  ): Promise<ProvisionComment[]> {
    return this.provisionCommentRepository.find(filter);
  }

  @patch('/provision-comments', {
    responses: {
      '200': {
        description: 'ProvisionComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionComment, {partial: true}),
        },
      },
    })
    provisionComment: ProvisionComment,
    @param.where(ProvisionComment) where?: Where<ProvisionComment>,
  ): Promise<Count> {
    return this.provisionCommentRepository.updateAll(provisionComment, where);
  }

  @get('/provision-comments/{id}', {
    responses: {
      '200': {
        description: 'ProvisionComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProvisionComment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProvisionComment, {exclude: 'where'}) filter?: FilterExcludingWhere<ProvisionComment>
  ): Promise<ProvisionComment> {
    return this.provisionCommentRepository.findById(id, filter);
  }

  @patch('/provision-comments/{id}', {
    responses: {
      '204': {
        description: 'ProvisionComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionComment, {partial: true}),
        },
      },
    })
    provisionComment: ProvisionComment,
  ): Promise<void> {
    await this.provisionCommentRepository.updateById(id, provisionComment);
  }

  @put('/provision-comments/{id}', {
    responses: {
      '204': {
        description: 'ProvisionComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() provisionComment: ProvisionComment,
  ): Promise<void> {
    await this.provisionCommentRepository.replaceById(id, provisionComment);
  }

  @del('/provision-comments/{id}', {
    responses: {
      '204': {
        description: 'ProvisionComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.provisionCommentRepository.deleteById(id);
  }
}
