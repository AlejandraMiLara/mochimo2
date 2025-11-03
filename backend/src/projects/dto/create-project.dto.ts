import { IsString, IsOptional, IsEnum, IsDateString, IsNumber, IsUUID } from 'class-validator';
import { ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsNumber()
  totalBudget?: number;

  @IsOptional()
  @IsUUID()
  clientId?: string;

  // userId removido - se obtiene del usuario autenticado
}