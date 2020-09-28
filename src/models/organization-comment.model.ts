import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {OrganizationCommentLike} from './organization-comment-like.model';
import {User} from './user.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'concordant', table: 'organization_comment'}
  }
})
export class OrganizationComment extends Entity {
  @property({
    type: 'number',
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 65535,
    mysql: {columnName: 'text', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  text: string;
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'organization_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  organization_id: number;
  
  @property({
    type: 'date',
    required: false,
    default: '$now',
    generated: true,
    mysql: {columnName: 'create_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  create_date: string;

  @hasMany(() => OrganizationCommentLike, {keyTo: 'organization_comment_id'})
  likes: OrganizationCommentLike[];

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<OrganizationComment>) {
    super(data);
  }
}

export interface OrganizationCommentRelations {
  // describe navigational properties here
}

export type OrganizationCommentWithRelations = OrganizationComment & OrganizationCommentRelations;
