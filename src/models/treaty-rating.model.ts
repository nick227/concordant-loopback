import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Organization} from './organization.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'treaty_rating'}}
})
export class TreatyRating extends Entity {
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
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'treaty_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  treaty_id: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: {columnName: 'value', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N'},
  })
  value: number;

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;

  @belongsTo(() => Organization, {name: 'organization'})
  organization_id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TreatyRating>) {
    super(data);
  }
}

export interface TreatyRatingRelations {
  // describe navigational properties here
}

export type TreatyRatingWithRelations = TreatyRating & TreatyRatingRelations;
