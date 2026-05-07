import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('recordings')
export class Recording {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  url: string;

  @Column({ type: 'int', nullable: true })
  durationMs: number;

  @ManyToOne(() => Project, { nullable: true, onDelete: 'SET NULL' })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
