import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Grievance} from './grievance.model';
import {Offer} from './offer.model';
import {User} from './user.model';
import {Vote} from './vote.model';
import {TreatyComment} from './treaty-comment.model';
import {Organization} from './organization.model';

@model({settings: {idInjection: false, mysql: {schema: 'concordant', table: 'treaty'}}})
export class Treaty extends Entity {
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
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  name: string;

  @property({
    type: 'string',
    required: false,
    length: 100,
    mysql: {columnName: 'status', dataType: 'varchar', dataLength: 12, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  status: string;

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
    mysql: {columnName: 'avatar_url', dataType: 'varchar', dataLength: 128, dataPrecision: null, dataScale: null, nullable: 'N'},
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

  @hasMany(() => Grievance, {keyTo: 'treaty_id'})
  grievances?: Grievance[];

  @hasMany(() => Offer, {keyTo: 'treaty_id'})
  offers: Offer[];

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;

  @hasMany(() => Vote, {keyTo: 'treaty_id'})
  votes: Vote[];

  @hasMany(() => TreatyComment, {keyTo: 'treaty_id'})
  comments: TreatyComment[];

  @belongsTo(() => Organization, {name: 'organization_a'})
  organization_a_id: number;

  @belongsTo(() => Organization, {name: 'organization_b'})
  organization_b_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Treaty>) {
    super(data);
  }
}

export interface TreatyRelations {
  // describe navigational properties here
}

export type TreatyWithRelations = Treaty & TreatyRelations;
