import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { Company } from './entities/company.entity';
import { Region } from './entities/region.entity';
import { Country } from './entities/country.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Job, Company, Region, Country]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
