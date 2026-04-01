import { CreateJobDto } from '../dto/create-job.dto';

export class JobMapper {
  static fromApi(apiJob: any): CreateJobDto {
    return {
      id: apiJob.id,
      title: apiJob.title ?? 'Unknown',
      location: apiJob.location ?? 'Unknown',
      hasRemote: apiJob.has_remote ?? false,
      publishedAt: new Date(apiJob.published),
      description: apiJob.description ?? '',
      experienceLevel: apiJob.experience_level ?? null,
      applicationUrl: apiJob.application_url ?? '',
      salaryMin: apiJob.salary_min ?? null,
      salaryMax: apiJob.salary_max ?? null,
      salaryCurrency: apiJob.salary_currency ?? null,
      company: {
        name: apiJob.company?.name ?? 'Unknown',
        logo: apiJob.company?.logo ?? null,
        websiteUrl: apiJob.company?.website_url ?? null,
        linkedinUrl: apiJob.company?.linkedin_url ?? null,
      },
    };
  }
}
