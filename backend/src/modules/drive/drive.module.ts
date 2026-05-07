import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriveService } from './drive.service';
import { DriveController } from './drive.controller';
import { DriveFile } from './entities/drive-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriveFile])],
  controllers: [DriveController],
  providers: [DriveService],
  exports: [DriveService],
})
export class DriveModule {}
