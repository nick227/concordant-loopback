import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Grievance} from './grievance.model';
import {Offer} from './offer.model';
import {Organization} from './organization.model';
import {Debate} from './debate.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'conflict'}}
})
export class Conflict extends Entity {
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
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    length: 65535,
    mysql: {columnName: 'description', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  description: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mysql: {columnName: 'avatar_url', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  avatar_url: string;

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
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'creator_user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  creator_user_id: number;

  @belongsTo(() => Organization, {name: 'organization_a'})
  organization_a_id: number;

  @belongsTo(() => Organization, {name: 'organization_b'})
  organization_b_id: number;

  @hasMany(() => Grievance, {keyTo: 'conflict_id'})
  grievances: Grievance[];

  @hasMany(() => Offer, {keyTo: 'conflict_id'})
  offers: Offer[];

  @hasMany(() => Debate, {keyTo: 'conflict_id'})
  debates: Debate[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Conflict>) {
    super(data);
  }
}

export interface ConflictRelations {
  // describe navigational properties here
}

export type ConflictWithRelations = Conflict & ConflictRelations;
