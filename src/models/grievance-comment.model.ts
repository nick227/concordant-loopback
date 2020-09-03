import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'grievance_comment'}}
})
export class GrievanceComment extends Entity {
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
    mysql: {columnName: 'grievance_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  grievance_id: number;

  @property({
    type: 'date',
    required: true,
    mysql: {columnName: 'create_date', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  create_date: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mysql: {columnName: 'media_url', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  media_url: string;

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GrievanceComment>) {
    super(data);
  }
}

export interface GrievanceCommentRelations {
  // describe navigational properties here
}

export type GrievanceCommentWithRelations = GrievanceComment & GrievanceCommentRelations;
