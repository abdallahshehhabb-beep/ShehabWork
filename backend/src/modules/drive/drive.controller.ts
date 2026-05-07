import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriveService } from './drive.service';
import { CreateDriveFileDto } from './dto/create-drive-file.dto';
import { UpdateDriveFileDto } from './dto/update-drive-file.dto';

@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @Post()
  create(@Body() dto: CreateDriveFileDto) {
    return this.driveService.create(dto);
  }

  @Get()
  findAll() {
    return this.driveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driveService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDriveFileDto) {
    return this.driveService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driveService.remove(id);
  }
}
