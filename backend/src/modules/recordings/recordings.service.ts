import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recording } from './entities/recording.entity';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';

@Injectable()
export class RecordingsService {
  constructor(
    @InjectRepository(Recording)
    private recordingsRepository: Repository<Recording>,
  ) {}

  async create(createRecordingDto: CreateRecordingDto): Promise<Recording> {
    const recording = this.recordingsRepository.create({
      title: createRecordingDto.title,
      url: createRecordingDto.url,
      durationMs: createRecordingDto.durationMs,
      project: createRecordingDto.projectId ? { id: createRecordingDto.projectId } : null,
    });
    return this.recordingsRepository.save(recording);
  }

  async findAll(): Promise<Recording[]> {
    return this.recordingsRepository.find({ relations: ['project'] });
  }

  async findOne(id: string): Promise<Recording> {
    const recording = await this.recordingsRepository.findOne({ where: { id }, relations: ['project'] });
    if (!recording) {
      throw new NotFoundException(`Recording with ID ${id} not found`);
    }
    return recording;
  }

  async update(id: string, updateRecordingDto: UpdateRecordingDto): Promise<Recording> {
    const recording = await this.findOne(id);
    if (updateRecordingDto.title) recording.title = updateRecordingDto.title;
    if (updateRecordingDto.url) recording.url = updateRecordingDto.url;
    if (updateRecordingDto.durationMs !== undefined) recording.durationMs = updateRecordingDto.durationMs;
    if (updateRecordingDto.projectId) recording.project = { id: updateRecordingDto.projectId } as any;
    return this.recordingsRepository.save(recording);
  }

  async remove(id: string): Promise<void> {
    const recording = await this.findOne(id);
    await this.recordingsRepository.remove(recording);
  }
}
