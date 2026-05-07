import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Recording } from '../../recordings/entities/recording.entity';

@Entity('transcriptions')
export class Transcription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  text: string;

  @OneToOne(() => Recording, { onDelete: 'CASCADE' })
  @JoinColumn()
  recording: Recording;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
