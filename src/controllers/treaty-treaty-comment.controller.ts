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
  TreatyComment,
} from '../models';
import {TreatyRepository} from '../repositories';

export class TreatyTreatyCommentController {
  constructor(
    @repository(TreatyRepository) protected treatyRepository: TreatyRepository,
  ) { }

  @get('/treaties/{id}/treaty-comments', {
    responses: {
      '200': {
        description: 'Array of Treaty has many TreatyComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TreatyComment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TreatyComment>,
  ): Promise<TreatyComment[]> {
    return this.treatyRepository.comments(id).find(filter);
  }

  @post('/treaties/{id}/treaty-comments', {
    responses: {
      '200': {
        description: 'Treaty model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreatyComment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Treaty.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyComment, {
            title: 'NewTreatyCommentInTreaty',
            exclude: ['id'],
            optional: ['treaty_id']
          }),
        },
      },
    }) treatyComment: Omit<TreatyComment, 'id'>,
  ): Promise<TreatyComment> {
    return this.treatyRepository.comments(id).create(treatyComment);
  }

  @patch('/treaties/{id}/treaty-comments', {
    responses: {
      '200': {
        description: 'Treaty.TreatyComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreatyComment, {partial: true}),
        },
      },
    })
    treatyComment: Partial<TreatyComment>,
    @param.query.object('where', getWhereSchemaFor(TreatyComment)) where?: Where<TreatyComment>,
  ): Promise<Count> {
    return this.treatyRepository.comments(id).patch(treatyComment, where);
  }

  @del('/treaties/{id}/treaty-comments', {
    responses: {
      '200': {
        description: 'Treaty.TreatyComment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TreatyComment)) where?: Where<TreatyComment>,
  ): Promise<Count> {
    return this.treatyRepository.comments(id).delete(where);
  }
}
