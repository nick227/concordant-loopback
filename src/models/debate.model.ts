import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {Conflict} from './conflict.model';
import {DebateComment} from './debate-comment.model';

@model({settings: {idInjection: false, mysql: {schema: 'concordant', table: 'debate'}}})
export class Debate extends Entity {
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
    length: 255,
    mysql: {columnName: 'title', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  title: string;

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

  @belongsTo(() => Conflict, {name: 'conflict'})
  conflict_id: number;

  @hasMany(() => DebateComment, {keyTo: 'debate_id'})
  comments: DebateComment[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Debate>) {
    super(data);
  }
}

export interface DebateRelations {
  // describe navigational properties here
}

export type DebateWithRelations = Debate & DebateRelations;
