import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProvisionComment} from './provision-comment.model';
import {ProvisionLike} from './provision-like.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'treaty_provision'}}
})
export class TreatyProvision extends Entity {
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
    mysql: {columnName: 'creator_user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  creator_user_id: number;

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
    mysql: {columnName: 'status_id', dataType: 'int', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  status_id: number;

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
    length: 6,
    mysql: {columnName: 'position', dataType: 'smallint', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  position: number;

  @hasMany(() => ProvisionComment, {keyTo: 'provision_id'})
  comments: ProvisionComment[];

  @hasMany(() => ProvisionLike, {keyTo: 'provision_id'})
  likes: ProvisionLike[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TreatyProvision>) {
    super(data);
  }
}

export interface TreatyProvisionRelations {
  // describe navigational properties here
}

export type TreatyProvisionWithRelations = TreatyProvision & TreatyProvisionRelations;
