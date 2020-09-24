import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {UserCommentLike} from './user-comment-like.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'user_comment'}}
})
export class UserComment extends Entity {
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
    mysql: {columnName: 'user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  user_id: number;

  @property({
    type: 'date',
    required: false,
    default: '$now',
    generated: true,
    mysql: {columnName: 'create_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  create_date: string;

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;

  @hasMany(() => UserCommentLike, {keyTo: 'user_comment_id'})
  likes: UserCommentLike[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserComment>) {
    super(data);
  }
}

export interface UserCommentRelations {
  // describe navigational properties here
}

export type UserCommentWithRelations = UserComment & UserCommentRelations;
