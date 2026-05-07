import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
  ) {}

  async create(dto: CreateContractDto): Promise<Contract> {
    const contract = this.contractsRepository.create(dto);
    return this.contractsRepository.save(contract);
  }

  async findAll(): Promise<Contract[]> {
    return this.contractsRepository.find();
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractsRepository.findOne({ where: { id } });
    if (!contract) throw new NotFoundException(`Contract ${id} not found`);
    return contract;
  }

  async update(id: string, dto: UpdateContractDto): Promise<Contract> {
    const contract = await this.findOne(id);
    Object.assign(contract, dto);
    return this.contractsRepository.save(contract);
  }

  async remove(id: string): Promise<void> {
    const contract = await this.findOne(id);
    await this.contractsRepository.remove(contract);
  }
}
