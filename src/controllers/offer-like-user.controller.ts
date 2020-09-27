import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OfferLike,
  User,
} from '../models';
import {OfferLikeRepository} from '../repositories';

export class OfferLikeUserController {
  constructor(
    @repository(OfferLikeRepository)
    public offerLikeRepository: OfferLikeRepository,
  ) { }

  @get('/offer-likes/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to OfferLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof OfferLike.prototype.id,
  ): Promise<User> {
    return this.offerLikeRepository.creator(id);
  }
}
