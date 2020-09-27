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
  Organization,
} from '../models';
import {OfferLikeRepository} from '../repositories';

export class OfferLikeOrganizationController {
  constructor(
    @repository(OfferLikeRepository)
    public offerLikeRepository: OfferLikeRepository,
  ) { }

  @get('/offer-likes/{id}/organization', {
    responses: {
      '200': {
        description: 'Organization belonging to OfferLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async getOrganization(
    @param.path.number('id') id: typeof OfferLike.prototype.id,
  ): Promise<Organization> {
    return this.offerLikeRepository.organization(id);
  }
}
