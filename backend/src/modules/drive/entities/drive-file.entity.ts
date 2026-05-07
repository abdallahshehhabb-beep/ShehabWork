import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('drive_files')
export class DriveFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column({ nullable: true })
  mimeType: string;

  @Column({ nullable: true })
  driveFileId: string;

  @Column({ nullable: true })
  folderId: string;

  @Column({ type: 'int', default: 0 })
  sizeBytes: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
