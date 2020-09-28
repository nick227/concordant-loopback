import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrganizationComment,
  User,
} from '../models';
import {OrganizationCommentRepository} from '../repositories';

export class OrganizationCommentUserController {
  constructor(
    @repository(OrganizationCommentRepository)
    public organizationCommentRepository: OrganizationCommentRepository,
  ) { }

  @get('/organization-comments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to OrganizationComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof OrganizationComment.prototype.id,
  ): Promise<User> {
    return this.organizationCommentRepository.creator(id);
  }
}
