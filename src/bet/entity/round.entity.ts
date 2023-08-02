import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { IRoundEntity } from '../types/IRoundEntity';

@Schema()
export class RoundEntity implements IRoundEntity {

  @Prop()
  idUser: string;

  @Prop()
  betValue: number;

  @Prop()
  winner: boolean;

  @Prop()
  winValue: number;

  @Prop()
  betSequence: number[];

  @Prop()
  drawnSequence: number[];

  @Prop()
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(RoundEntity);
