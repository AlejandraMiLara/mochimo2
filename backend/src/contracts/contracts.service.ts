import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async create(createContractDto: CreateContractDto, userId: string) {
    const { projectId } = createContractDto;

    const project = await this.prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      throw new UnauthorizedException('El proyecto no existe o no pertenece al usuario');
    }

    return this.prisma.contract.create({
      data: createContractDto,
    });
  }

  async findAllForProject(projectId: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      throw new UnauthorizedException('El proyecto no existe o no pertenece al usuario');
    }

    return this.prisma.contract.findMany({
      where: { projectId },
    });
  }

  async findOne(id: string, userId: string) {
    const contract = await this.prisma.contract.findFirst({
      where: {
        id,
        project: {
          userId,
        },
      },
    });

    if (!contract) {
      throw new NotFoundException('Contrato no encontrado o no pertenece al usuario');
    }
    return contract;
  }

  async update(id: string, updateContractDto: UpdateContractDto, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.contract.update({
      where: { id },
      data: updateContractDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.contract.delete({
      where: { id },
    });
  }
}