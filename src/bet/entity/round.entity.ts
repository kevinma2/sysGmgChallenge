import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRoundEntity } from '../types/IRoundEntity';
import { Document } from 'mongoose';

@Schema()
export class RoundEntity implements IRoundEntity  {

  @Prop()
  idUser: string;

  @Prop()
  betValue: number;

  @Prop()
  winner: boolean;

  @Prop()
  winValue: number;

  @Prop()
  numberSequence: number[];

  @Prop()
  drawnSequence: number[];

  @Prop()
  createdAt: Date;
}

export const RoundSchema = SchemaFactory.createForClass(RoundEntity);
