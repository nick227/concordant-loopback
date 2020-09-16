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
  TreatyProvision,
  ProvisionComment,
} from '../models';
import {TreatyProvisionRepository} from '../repositories';

export class TreatyProvisionProvisionCommentController {
  constructor(
    @repository(TreatyProvisionRepository) protected treatyProvisionRepository: TreatyProvisionRepository,
  ) { }

  @get('/treaty-provisions/{id}/provision-comments', {
    responses: {
      '200': {
        description: 'Array of TreatyProvision has many ProvisionComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProvisionComment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProvisionComment>,
  ): Promise<ProvisionComment[]> {
    return this.treatyProvisionRepository.comments(id).find(filter);
  }

  @post('/treaty-provisions/{id}/provision-comments', {
    responses: {
      '200': {
        description: 'TreatyProvision model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProvisionComment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TreatyProvision.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionComment, {
            title: 'NewProvisionCommentInTreatyProvision',
            exclude: ['id'],
            optional: ['provision_id']
          }),
        },
      },
    }) provisionComment: Omit<ProvisionComment, 'id'>,
  ): Promise<ProvisionComment> {
    return this.treatyProvisionRepository.comments(id).create(provisionComment);
  }

  @patch('/treaty-provisions/{id}/provision-comments', {
    responses: {
      '200': {
        description: 'TreatyProvision.ProvisionComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProvisionComment, {partial: true}),
        },
      },
    })
    provisionComment: Partial<ProvisionComment>,
    @param.query.object('where', getWhereSchemaFor(ProvisionComment)) where?: Where<ProvisionComment>,
  ): Promise<Count> {
    return this.treatyProvisionRepository.comments(id).patch(provisionComment, where);
  }

  @del('/treaty-provisions/{id}/provision-comments', {
    responses: {
      '200': {
        description: 'TreatyProvision.ProvisionComment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProvisionComment)) where?: Where<ProvisionComment>,
  ): Promise<Count> {
    return this.treatyProvisionRepository.comments(id).delete(where);
  }
}
