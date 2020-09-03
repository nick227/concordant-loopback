import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'organization'}}
})
export class Organization extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 100,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N'},
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
    length: 200,
    mysql: {columnName: 'avatar_url', dataType: 'varchar', dataLength: 200, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  avatar_url: string;

  @property({
    type: 'number',
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {
  // describe navigational properties here
}

export type OrganizationWithRelations = Organization & OrganizationRelations;
