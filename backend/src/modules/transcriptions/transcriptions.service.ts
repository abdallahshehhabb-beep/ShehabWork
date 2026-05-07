import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transcription } from './entities/transcription.entity';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';

@Injectable()
export class TranscriptionsService {
  constructor(
    @InjectRepository(Transcription)
    private transcriptionsRepository: Repository<Transcription>,
  ) {}

  async create(createTranscriptionDto: CreateTranscriptionDto): Promise<Transcription> {
    const transcription = this.transcriptionsRepository.create({
      text: createTranscriptionDto.text,
      recording: { id: createTranscriptionDto.recordingId },
    });
    return this.transcriptionsRepository.save(transcription);
  }

  async findAll(): Promise<Transcription[]> {
    return this.transcriptionsRepository.find({ relations: ['recording'] });
  }

  async findOne(id: string): Promise<Transcription> {
    const transcription = await this.transcriptionsRepository.findOne({ where: { id }, relations: ['recording'] });
    if (!transcription) {
      throw new NotFoundException(`Transcription with ID ${id} not found`);
    }
    return transcription;
  }

  async update(id: string, updateTranscriptionDto: UpdateTranscriptionDto): Promise<Transcription> {
    const transcription = await this.findOne(id);
    if (updateTranscriptionDto.text) transcription.text = updateTranscriptionDto.text;
    return this.transcriptionsRepository.save(transcription);
  }

  async remove(id: string): Promise<void> {
    const transcription = await this.findOne(id);
    await this.transcriptionsRepository.remove(transcription);
  }
}
