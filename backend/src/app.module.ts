import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { RecordingsModule } from './modules/recordings/recordings.module';
import { TranscriptionsModule } from './modules/transcriptions/transcriptions.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { DriveModule } from './modules/drive/drive.module';
import { UploadModule } from './modules/upload/upload.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        process.env.DATABASE_URL
          ? {
              type: 'postgres',
              url: process.env.DATABASE_URL,
              autoLoadEntities: true,
              synchronize: false,
              ssl: { rejectUnauthorized: false },
            }
          : {
              type: 'sqlite',
              database: 'db.sqlite',
              autoLoadEntities: true,
              synchronize: true,
            },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    RecordingsModule,
    TranscriptionsModule,
    ContractsModule,
    DriveModule,
    UploadModule,
    MailModule,
  ],
})
export class AppModule {}