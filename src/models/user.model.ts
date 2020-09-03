import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'concordant', table: 'user'}}})
export class User extends Entity {
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
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  email: string;

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
    mysql: {columnName: 'biography', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  biography: string;

  @property({
    type: 'string',
    required: true,
    length: 32,
    mysql: {columnName: 'password', dataType: 'char', dataLength: 32, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  password: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'type_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  type_id: number;

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
    mysql: {columnName: 'location', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  location: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
