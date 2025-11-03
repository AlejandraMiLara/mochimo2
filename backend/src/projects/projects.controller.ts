import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @GetUser('id') userId: string) {
    return this.projectsService.create(createProjectDto,userId);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.projectsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') userId: string) {
    return this.projectsService.findOne(id,userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser('id') userId:string,
  ) {
    return this.projectsService.update(id, updateProjectDto, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') userId: string) {
    return this.projectsService.remove(id, userId);
  }
}