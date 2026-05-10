import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

export enum UserRole {
  TEAM_LEADER = 'team_leader',
  FREELANCER = 'freelancer',
  ADMIN = 'admin',
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  BANNED = 'banned',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'varchar', default: UserRole.FREELANCER })
  role: UserRole;

  @Column({ type: 'varchar', default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  photoUrl: string;

  @Column({ type: 'text', nullable: true })
  idCardUrl: string; // Base64 encoded image stored directly in DB

  @Column({ type: 'simple-array', nullable: true })
  skills: string[];

  @Column({ type: 'simple-array', nullable: true })
  languages: string[];

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  teamLeaderId: string;

  @OneToMany(() => Project, project => project.user)
  projects: Project[];
}
