import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create({
      title: createProjectDto.title,
      description: createProjectDto.description,
      type: createProjectDto.type,
      language: createProjectDto.language,
      nationalityReq: createProjectDto.nationalityReq,
      autoAccept: createProjectDto.autoAccept,
      reward: createProjectDto.reward,
      applicantsReq: createProjectDto.applicantsReq,
      deadline: createProjectDto.deadline,
      generateCodes: createProjectDto.generateCodes,
      adminCommission: createProjectDto.adminCommission,
      user: { id: createProjectDto.userId },
    });
    return this.projectsRepository.save(project);
  }

  async findAll(filters?: { type?: string; language?: string }): Promise<Project[]> {
    const query = this.projectsRepository.createQueryBuilder('project')
      .leftJoinAndSelect('project.user', 'user');

    if (filters?.type) {
      query.andWhere('project.type = :type', { type: filters.type });
    }

    if (filters?.language) {
      query.andWhere('project.language = :language', { language: filters.language });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectsRepository.remove(project);
  }
}
