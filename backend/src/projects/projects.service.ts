import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { connect } from 'http2';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    const { clientId, ...projectData } = createProjectDto;

    // Verificar que el cliente le pertenece al usuario
    if (clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: clientId, userId: userId },
      });
      if (!client) {
        throw new UnauthorizedException('El cliente no existe o no pertenece al usuario');
      }
    }

    const createData: any ={
      ...projectData, user:{connect: {id: userId}},
    };

    if(clientId){
      createData.client = {connect: {id: clientId}};
    }

    // Crear el proyecto
    const project = await this.prisma.project.create({
      data: createData,
      include: {
        client: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            lastName: true,
          },
        },
      },
    });

    return {
      mensaje: 'Proyecto creado correctamente',
      datos: project,
    };
  }

  async findAll(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: { userId: userId },
      include: {
        client: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            tasks: true,
            invoices: true,
          },
        },
      },
    });

    return {
      mensaje: 'Proyectos obtenidos correctamente',
      datos: projects,
    };
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        client: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            lastName: true,
          },
        },
        tasks: true,
        invoices: true,
        contracts: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Proyecto no encontrado o no pertenece al usuario');
    }

    return {
      mensaje: 'Proyecto obtenido correctamente',
      datos: project,
    };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    // Verificar que el proyecto le pertenece al usuario
    await this.findOne(id, userId);

    try {
      const project = await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
        include: {
          client: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              lastName: true,
            },
          },
        },
      });

      return {
        mensaje: 'Proyecto actualizado correctamente',
        datos: project,
      };
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar. Proyecto no encontrado.');
    }
  }

  async remove(id: string, userId: string) {
    // Verificar que el proyecto le pertenece al usuario
    await this.findOne(id, userId);

    try {
      await this.prisma.project.delete({
        where: { id },
      });

      return {
        mensaje: 'Proyecto eliminado correctamente',
      };
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar. Proyecto no encontrado.');
    }
  }
}