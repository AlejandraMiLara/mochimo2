import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  create(
    @Body() createContractDto: CreateContractDto,
    @GetUser('id') userId: string,
  ) {
    return this.contractsService.create(createContractDto, userId);
  }

  @Get()
  findAll(
    @Query('projectId', ParseUUIDPipe) projectId: string,
    @GetUser('id') userId: string,
  ) {
    if (!projectId) {
      throw new BadRequestException('El query param "projectId" es requerido');
    }
    return this.contractsService.findAllForProject(projectId, userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('id') userId: string,
  ) {
    return this.contractsService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateContractDto: UpdateContractDto,
    @GetUser('id') userId: string,
  ) {
    return this.contractsService.update(id, updateContractDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('id') userId: string,
  ) {
    return this.contractsService.remove(id, userId);
  }
}