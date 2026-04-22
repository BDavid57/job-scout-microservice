import { IsOptional, IsString, IsBoolean, IsNumber, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class JobsQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  region_id?: string;

  @IsOptional()
  @IsString()
  max_age?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  has_remote?: boolean;

  @IsOptional()
  @IsString()
  experience_level?: 'EN' | 'MI' | 'SE' | 'EX';

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  min_salary?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  max_salary?: number;

  @IsOptional()
  @IsString()
  salary_currency?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page_size?: number;
}
