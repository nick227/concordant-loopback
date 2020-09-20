import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DebateComment,
  Debate,
} from '../models';
import {DebateCommentRepository} from '../repositories';

export class DebateCommentDebateController {
  constructor(
    @repository(DebateCommentRepository)
    public debateCommentRepository: DebateCommentRepository,
  ) { }

  @get('/debate-comments/{id}/debate', {
    responses: {
      '200': {
        description: 'Debate belonging to DebateComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Debate)},
          },
        },
      },
    },
  })
  async getDebate(
    @param.path.number('id') id: typeof DebateComment.prototype.id,
  ): Promise<Debate> {
    return this.debateCommentRepository.debate(id);
  }
}
