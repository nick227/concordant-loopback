import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Debate} from './debate.model';
import {User} from './user.model';
import {DebateCommentLike} from './debate-comment-like.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'debate_comment'}}
})
export class DebateComment extends Entity {
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
    type: 'date',
    required: false,
    default: '$now',
    generated: true,
    mysql: {columnName: 'create_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  create_date: string;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    default: 'null',
    nullable: true,
    scale: 0,
    mysql: {columnName: 'parent_comment_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  parent_comment_id: number;

  @belongsTo(() => Debate, {name: 'debate'})
  debate_id: number;

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;

  @hasMany(() => DebateCommentLike, {keyTo: 'debate_comment_id'})
  likes: DebateCommentLike[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DebateComment>) {
    super(data);
  }
}

export interface DebateCommentRelations {
  // describe navigational properties here
}

export type DebateCommentWithRelations = DebateComment & DebateCommentRelations;
