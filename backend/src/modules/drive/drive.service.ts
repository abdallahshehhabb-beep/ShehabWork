import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriveFile } from './entities/drive-file.entity';
import { CreateDriveFileDto } from './dto/create-drive-file.dto';
import { UpdateDriveFileDto } from './dto/update-drive-file.dto';

@Injectable()
export class DriveService {
  constructor(
    @InjectRepository(DriveFile)
    private driveFileRepository: Repository<DriveFile>,
  ) {}

  async create(dto: CreateDriveFileDto): Promise<DriveFile> {
    const file = this.driveFileRepository.create(dto);
    return this.driveFileRepository.save(file);
  }

  async findAll(): Promise<DriveFile[]> {
    return this.driveFileRepository.find();
  }

  async findOne(id: string): Promise<DriveFile> {
    const file = await this.driveFileRepository.findOne({ where: { id } });
    if (!file) throw new NotFoundException(`DriveFile ${id} not found`);
    return file;
  }

  async update(id: string, dto: UpdateDriveFileDto): Promise<DriveFile> {
    const file = await this.findOne(id);
    Object.assign(file, dto);
    return this.driveFileRepository.save(file);
  }

  async remove(id: string): Promise<void> {
    const file = await this.findOne(id);
    await this.driveFileRepository.remove(file);
  }
}
