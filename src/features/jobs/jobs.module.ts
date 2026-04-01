import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { Company } from './entities/company.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Job, Company]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
