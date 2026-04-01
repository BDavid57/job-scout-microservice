export class CreateJobDto {
  id: number;
  title: string;
  location: string;
  hasRemote: boolean;
  publishedAt: Date;
  description: string;
  experienceLevel?: string;
  applicationUrl: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;

  company: {
    name: string;
    logo?: string;
    websiteUrl?: string;
    linkedinUrl?: string;
  };
}
