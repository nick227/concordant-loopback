import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {ActivityComment} from './activity-comment.model';
import {ActivityEmotion} from './activity-emotion.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'activity'}}
})
export class Activity extends Entity {
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
    required: true,
    length: 50,
    mysql: {columnName: 'entity_type', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  entity_type: string;

  @property({
    type: 'number',
    required: false,
    default: null,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'entity_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  entity_id: number;

  @property({
    type: 'string',
    required: true,
    length: 65535,
    mysql: {columnName: 'message', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  message: string;

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;

  @hasMany(() => ActivityComment, {keyTo: 'activity_id'})
  comments: ActivityComment[];

  @hasMany(() => ActivityEmotion, {keyTo: 'activity_id'})
  emotions: ActivityEmotion[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Activity>) {
    super(data);
  }
}

export interface ActivityRelations {
  // describe navigational properties here
}

export type ActivityWithRelations = Activity & ActivityRelations;
