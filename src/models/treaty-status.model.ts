import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'treaty_status'}}
})
export class TreatyStatus extends Entity {
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
    length: 12,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 12, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TreatyStatus>) {
    super(data);
  }
}

export interface TreatyStatusRelations {
  // describe navigational properties here
}

export type TreatyStatusWithRelations = TreatyStatus & TreatyStatusRelations;
