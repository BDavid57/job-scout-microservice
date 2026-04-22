import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { JobsQueryDto } from './dto/jobs-query.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  fetchAllJobs(@Query() query: JobsQueryDto) {
    return this.jobsService.fetchFromApi(query);
  }

  @Get('saved')
  getJobs(@Query() query: JobsQueryDto) {
    return this.jobsService.findAll(query);
  }

  @Get(':id')
  getJob(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findOne(id);
  }

  @Post('sync')
  syncJobs(@Query() query: JobsQueryDto) {
    return this.jobsService.syncJobs(query);
  }

  @Post('regions')
  syncRegions() {
    return this.jobsService.syncRegions()
  }

  @Post('countries')
  syncCountries() {
    return this.jobsService.syncCountries()
  }
}
