import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const { clientId, userId, ...projectData } = createProjectDto;
    const project = await this.prisma.project.create({
      data: {
        ...projectData,
        client: {
          connect: { id: clientId },
        },
        user: {
          connect: { id: userId },
        },
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
      },
    });

    return {
      mensaje: 'Proyecto creado correctamente',
      datos: project,
    };
  }

  async findAll() {
    const projects = await this.prisma.project.findMany({
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

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
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
      throw new NotFoundException('Proyecto no encontrado');
    }

    return {
      mensaje: 'Proyecto obtenido correctamente',
      datos: project,
    };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
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

  async remove(id: string) {
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