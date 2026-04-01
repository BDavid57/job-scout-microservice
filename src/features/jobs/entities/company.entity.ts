import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Job } from './job.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  websiteUrl?: string;

  @Column({ nullable: true })
  linkedinUrl?: string;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];
}
