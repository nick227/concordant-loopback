import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Offer,
  User,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferUserController {
  constructor(
    @repository(OfferRepository)
    public offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Offer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Offer.prototype.id,
  ): Promise<User> {
    return this.offerRepository.creator(id);
  }
}
