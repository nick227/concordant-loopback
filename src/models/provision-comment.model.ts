import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'provision_comment'}}
})
export class ProvisionComment extends Entity {
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
    mysql: {columnName: 'creator_user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  creator_user_id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'provision_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  provision_id: number;

  @property({
    type: 'date',
    required: false,
    default: '$now',
    generated: true,
    mysql: {columnName: 'create_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  create_date: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProvisionComment>) {
    super(data);
  }
}

export interface ProvisionCommentRelations {
  // describe navigational properties here
}

export type ProvisionCommentWithRelations = ProvisionComment & ProvisionCommentRelations;
