import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundEntity, RoundSchema } from './entity/round.entity';
import { RoundService } from './service/round.service';
import { GenerateNumbersService } from './service/generate-numbers.service';
import { RoundController } from './round.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoundEntity.name, schema: RoundSchema }]),
  ],
  providers: [RoundService, GenerateNumbersService],
  controllers: [RoundController],
})
export class RoundModule {}
