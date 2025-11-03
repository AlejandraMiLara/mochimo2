import { IsString, IsOptional, IsEnum, IsDateString, IsDecimal, IsUUID } from 'class-validator';
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
  @IsDecimal()
  totalBudget?: number;

  @IsOptional()
  @IsUUID()
  clientId?: string;

  @IsUUID()
  userId: string;
}