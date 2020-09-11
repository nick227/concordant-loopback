import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'grievance_like'}}
})

export class GrievanceLike extends Entity {
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
  })
  organization_id: number;

  @property({
    type: 'number',
    required: true,
  })
  grievance_id: number;

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
  })
  liked: number;

  @belongsTo(() => User, {name: 'creator'})
  creator_user_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GrievanceLike>) {
    super(data);
  }
}

export interface GrievanceLikeRelations {
  // describe navigational properties here
}

export type GrievanceLikeWithRelations = GrievanceLike & GrievanceLikeRelations;
