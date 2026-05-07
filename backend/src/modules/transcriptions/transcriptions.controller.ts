import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranscriptionsService } from './transcriptions.service';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';

@Controller('transcriptions')
export class TranscriptionsController {
  constructor(private readonly transcriptionsService: TranscriptionsService) {}

  @Post()
  create(@Body() createTranscriptionDto: CreateTranscriptionDto) {
    return this.transcriptionsService.create(createTranscriptionDto);
  }

  @Get()
  findAll() {
    return this.transcriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transcriptionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranscriptionDto: UpdateTranscriptionDto) {
    return this.transcriptionsService.update(id, updateTranscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transcriptionsService.remove(id);
  }
}
