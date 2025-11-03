import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDateString, IsEnum } from 'class-validator';
import { ContractStatus } from '@prisma/client';

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  terms: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsEnum(ContractStatus)
  @IsOptional()
  status?: ContractStatus;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsDateString()
  @IsOptional()
  signedDate?: Date;
}