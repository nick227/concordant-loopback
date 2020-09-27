import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {User} from './user.model';
import {OfferComment} from './offer-comment.model';
import {Organization} from './organization.model';
import {OfferLike} from './offer-like.model';

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
    length: 100,
    mysql: {columnName: 'title', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  title: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'conflict_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  conflict_id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'creator_organization_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  creator_organization_id: number;

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

  @hasMany(() => OfferComment, {keyTo: 'offer_id'})
  comments: OfferComment[];

  @belongsTo(() => Organization, {name: 'organization'})
  organization_id: number;

  @hasMany(() => OfferLike, {keyTo: 'offer_id'})
  likes: OfferLike[];
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
