import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranscriptionsService } from './transcriptions.service';
import { TranscriptionsController } from './transcriptions.controller';
import { Transcription } from './entities/transcription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transcription])],
  controllers: [TranscriptionsController],
  providers: [TranscriptionsService],
  exports: [TranscriptionsService],
})
export class TranscriptionsModule {}
