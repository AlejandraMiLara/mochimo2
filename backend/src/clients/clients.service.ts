import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  create(createClientDto: CreateClientDto, userId: string) {
    return this.prisma.client.create({
      data: {
        ...createClientDto,
        userId: userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.client.findMany({
      where: { userId },
    });
  }

  async findOne(id: string, userId: string) {
    const client = await this.prisma.client.findFirst({
      where: { id, userId },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado o no pertenece al usuario');
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    await this.findOne(id, userId);
    
    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.client.delete({
      where: { id },
    });
  }
}