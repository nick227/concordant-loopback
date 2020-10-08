import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'achievement_type'}}
})
export class AchievementType extends Entity {
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
    length: 24,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 24, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mysql: {columnName: 'avatar_url', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  avatar_url: string;

  @property({
    type: 'number',
    required: true,
    precision: 5,
    scale: 0,
    mysql: {columnName: 'point_value', dataType: 'smallint', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'N'},
  })
  point_value: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AchievementType>) {
    super(data);
  }
}

export interface AchievementTypeRelations {
  // describe navigational properties here
}

export type AchievementTypeWithRelations = AchievementType & AchievementTypeRelations;
