import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { Job } from './entities/job.entity';
import { Company } from './entities/company.entity';
import { JobsQueryDto } from './dto/jobs-query.dto';
import { JobMapper } from './mappers/job.mapper';
import { Region } from './entities/region.entity';
import { Country } from './entities/country.entity';
import { countryMapper } from './mappers/country.mapper';

@Injectable()
export class JobsService {
  private readonly BASE_URL = 'https://jobdataapi.com/api/';

  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,

    @InjectRepository(Region)
    private readonly regionRepo: Repository<Region>,

    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}

  async syncCountries() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.BASE_URL}jobcountries`, {
          headers: {
            Authorization: `Api-Key ${process.env.JOBDATA_API_KEY}`,
          },
        }),
      );

      const list = response.data

      for(const item of list) {
        const mapped = countryMapper.fromApi(item)

        let country = await this.regionRepo.findOne({
          where: { name: mapped.name },
        });

        if(!country) {
          const regionEntity = this.countryRepo.create(mapped);
          await this.countryRepo.save(regionEntity);
        }
      }

      return list;
    } catch (error: any) {
      console.log(error.response.data.detail)
      throw new HttpException(
        'Failed to fetch jobs from external API',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async syncRegions() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.BASE_URL}jobregions`, {
          headers: {
            Authorization: `Api-Key ${process.env.JOBDATA_API_KEY}`,
          },
        }),
      );

      const list = response.data
      
      for(const item of list) {
        let region = await this.regionRepo.findOne({
          where: { name: item.name },
        });

        if(!region) {
          const regionEntity = this.regionRepo.create(item);
          await this.regionRepo.save(regionEntity);
        }
      }

      return list;
    } catch (error: any) {
      console.log(error.response.data.detail)
      throw new HttpException(
        'Failed to fetch jobs from external API',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchFromApi(query: JobsQueryDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.BASE_URL}jobs`, {
          headers: {
            Authorization: `Api-Key ${process.env.JOBDATA_API_KEY}`,
          },
          params: {
            ...query,
            description_str: true,
            description_off: true,
          },
        }),
      );

      return response.data;
    } catch (error: any) {
      console.log(error.response.data.detail)
      throw new HttpException(
        'Failed to fetch jobs from external API',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async syncJobs(query: JobsQueryDto) {
    const data = await this.fetchFromApi(query);

    const list = data.results

    for (const apiJob of list) {
      const mapped = JobMapper.fromApi(apiJob);

      let company = await this.companyRepo.findOne({
        where: { name: mapped.company.name },
      });

      if (!company) {
        company = this.companyRepo.create(mapped.company);
        await this.companyRepo.save(company);
      }

      const existingJob = await this.jobRepo.findOne({
        where: { id: mapped.id },
      });

      if (existingJob) {
        await this.jobRepo.update(mapped.id, {
          ...mapped,
          company,
        });
      } else {
        const jobEntity = this.jobRepo.create({
          ...mapped,
          company,
        });
        await this.jobRepo.save(jobEntity);
      }
    }

    return {
      message: 'Jobs synced successfully',
      count: list.length,
    };
  }

  async findAll(query: JobsQueryDto) {
    const qb = this.jobRepo
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company');

    if (query.title) {
      qb.andWhere('LOWER(job.title) LIKE LOWER(:title)', {
        title: `%${query.title}%`,
      });
    }

    if (query.location) {
      qb.andWhere('LOWER(job.location) LIKE LOWER(:location)', {
        location: `%${query.location}%`,
      });
    }

    if (query.has_remote !== undefined) {
      qb.andWhere('job.hasRemote = :remote', {
        remote: query.has_remote,
      });
    }

    if (query.experience_level) {
      qb.andWhere('job.experienceLevel = :exp', {
        exp: query.experience_level,
      });
    }

    if (query.min_salary) {
      qb.andWhere('job.salaryMin >= :minSalary', {
        minSalary: query.min_salary,
      });
    }

    if (query.max_salary) {
      qb.andWhere('job.salaryMax <= :maxSalary', {
        maxSalary: query.max_salary,
      });
    }

    const page = query.page || 1;
    const pageSize = query.page_size || 20;

    qb.skip((page - 1) * pageSize).take(pageSize);

    qb.orderBy('job.publishedAt', 'DESC');

    const [results, total] = await qb.getManyAndCount();

    return {
      count: total,
      page,
      pageSize,
      results,
    };
  }

  async findOne(id: number) {
    const job = await this.jobRepo.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!job) {
      throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
    }

    return job;
  }
}
