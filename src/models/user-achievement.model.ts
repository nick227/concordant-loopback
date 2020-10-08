import {Entity, model, property, belongsTo} from '@loopback/repository';
import {AchievementType} from './achievement-type.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'concordant', table: 'user_achievement'}}
})
export class UserAchievement extends Entity {
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
    mysql: {columnName: 'owner_user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  owner_user_id: number;
  @property({
    type: 'date',
    required: false,
    default: '$now',
    generated: true,
    mysql: {columnName: 'create_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  create_date: string;

  @belongsTo(() => AchievementType, {name: 'type'})
  achievement_type_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserAchievement>) {
    super(data);
  }
}

export interface UserAchievementRelations {
  // describe navigational properties here
}

export type UserAchievementWithRelations = UserAchievement & UserAchievementRelations;
