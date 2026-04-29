export type Company = {
  id: number;
  source_id: number;
  name: string;
  logo: string | null;
  website_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  twitter_handle: string | null;
  github_url: string | null;
  is_agency: boolean;
};

export type JobType = {
  id: number;
  name: string;
};

export type Region = {
  id: number;
  name: string;
};

export type Country = {
  id: number;
  code: string;
  name: string;
  region: Region;
};

export type City = {
  id: number;
  name: string;
};

export type State = {
  id: number;
  name: string;
};

export type SaveJobDto = {
  id: number;
  ext_id: string;

  company: Company;

  title: string;
  location: string;

  types: JobType[];

  cities: City[];
  states: State[];
  countries: Country[];
  regions: Region[];

  has_remote: boolean;

  published: string;

  experience_level: "SE" | "JR" | "MID" | string; 

  application_url: string;
  language: string;

  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;

  description_string: string;
};
