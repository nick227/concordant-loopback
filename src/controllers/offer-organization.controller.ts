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
  Organization,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferOrganizationController {
  constructor(
    @repository(OfferRepository)
    public offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/organization', {
    responses: {
      '200': {
        description: 'Organization belonging to Offer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Organization)},
          },
        },
      },
    },
  })
  async getOrganization(
    @param.path.number('id') id: typeof Offer.prototype.id,
  ): Promise<Organization> {
    return this.offerRepository.organization(id);
  }
}
