import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Conflict, ConflictWithRelations} from './conflict.model';
import {User} from './user.model';
import {GrievanceComment} from './grievance-comment.model';
import {Organization} from './organization.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'grievance'}}
})
export class Grievance extends Entity {
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
    type: 'string',
    required: true,
    length: 65535,
    mysql: {columnName: 'description', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  description: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'creator_organization_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  creator_organization_id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'conflict_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  conflict_id: number;

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

  @hasMany(() => GrievanceComment, {keyTo: 'grievance_id'})
  comments: GrievanceComment[];

  @belongsTo(() => Organization, {name: 'organization'})
  organization_id: number;
  
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Grievance>) {
    super(data);
  }
}

export interface GrievanceRelations {
  // describe navigational properties here
}

export type GrievanceWithRelations = Grievance & GrievanceRelations;
