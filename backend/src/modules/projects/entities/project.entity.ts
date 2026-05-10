import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ProjectStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  PAUSED = 'paused',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  type: string; // recording, transcription, conversation

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  adminCommission: string;


  @Column({ nullable: true })
  nationalityReq: string;

  @Column({ default: false })
  autoAccept: boolean;

  @Column({ nullable: true })
  reward: string;

  @Column({ nullable: true })
  applicantsReq: number;

  @Column({ type: 'datetime', nullable: true })
  deadline: Date;

  @Column({ default: false })
  generateCodes: boolean;

  @Column({ type: 'varchar', default: ProjectStatus.OPEN })
  status: ProjectStatus;

  @ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE' })
  user: User; // Team Leader

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
