import {Entity, model, property, hasMany} from '@loopback/repository';
import {Organization} from './organization.model';
import {UserToOrganization} from './user-to-organization.model';
import {UserComment} from './user-comment.model';
import {UserMessage} from './user-message.model';

@model({settings: {idInjection: false, mysql: {schema: 'concordant', table: 'user'}}})
export class User extends Entity {
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
    type: 'date',
    required: false,
    default: '$now',
    generated: true,
    mysql: {columnName: 'create_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  create_date: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    length: 255,
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  email: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    length: 255,
    mysql: {columnName: 'avatar_url', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  avatar_url: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    length: 17,
    mysql: {columnName: 'facebook_uuid', dataType: 'varchar', dataLength: 17, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  facebook_uuid: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    length: 100,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  name: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    length: 65535,
    mysql: {columnName: 'biography', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  biography: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    length: 32,
    mysql: {columnName: 'password', dataType: 'char', dataLength: 32, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  password: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    length: 255,
    mysql: {columnName: 'profile_background_url', dataType: 'char', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  profile_background_url: string;

  @property({
    type: 'number',
    required: false,
    default: '',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'type_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  type_id: number;

  @property({
    type: 'string',
    required: false,
    default: '',
    length: 255,
    mysql: {columnName: 'location', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  location: string;

  @hasMany(() => Organization, {through: {model: () => UserToOrganization, keyFrom: 'creator_user_id', keyTo: 'organization_id'}})
  organizations: Organization[];

  @hasMany(() => UserComment, {keyTo: 'user_id'})
  comments: UserComment[];

  @hasMany(() => UserMessage, {keyTo: 'user_id'})
  messages: UserMessage[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;