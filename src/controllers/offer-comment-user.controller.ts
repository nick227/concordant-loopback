import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OfferComment,
  User,
} from '../models';
import {OfferCommentRepository} from '../repositories';

export class OfferCommentUserController {
  constructor(
    @repository(OfferCommentRepository)
    public offerCommentRepository: OfferCommentRepository,
  ) { }

  @get('/offer-comments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to OfferComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof OfferComment.prototype.id,
  ): Promise<User> {
    return this.offerCommentRepository.creator(id);
  }
}
