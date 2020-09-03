import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {OfferComment} from './offer-comment.model';

@model({settings: {idInjection: false, mysql: {schema: 'concordant', table: 'offer'}}})
export class Offer extends Entity {
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
    mysql: {columnName: 'treaty_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  treaty_id: number;

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
    required: true,
    mysql: {columnName: 'create_date', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  create_date: string;

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;

  @hasMany(() => OfferComment, {keyTo: 'offer_id'})
  comments: OfferComment[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Offer>) {
    super(data);
  }
}

export interface OfferRelations {
  // describe navigational properties here
}

export type OfferWithRelations = Offer & OfferRelations;
