import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import 'multer';

@Controller('upload')
export class UploadController {
  @Post('id-card')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/id-cards',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|jpg|png|webp)$/)) {
          return cb(new BadRequestException('Only image files are allowed (jpg, png, webp)'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadIdCard(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const url = `/uploads/id-cards/${file.filename}`;
    return { url, message: 'File uploaded successfully' };
  }

  @Post('profile-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-photos',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 3 * 1024 * 1024 }, // 3MB max
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|jpg|png|webp)$/)) {
          return cb(new BadRequestException('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadProfilePhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const url = `/uploads/profile-photos/${file.filename}`;
    return { url, message: 'Photo uploaded successfully' };
  }
}
