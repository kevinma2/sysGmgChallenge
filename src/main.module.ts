import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { RoundModule } from './bet/round.module';

@Module({
  imports: [RoundModule ,DataBaseModule],
})
export class MainModule {}
