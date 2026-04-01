import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Company } from './company.entity';

@Entity('jobs')
@Index(['title'])
@Index(['location'])
@Index(['publishedAt'])
export class Job {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column({ default: false })
  hasRemote: boolean;

  @Column({ type: 'timestamp' })
  publishedAt: Date;

  @Column({ type: 'text', nullable: true  })
  description: string;

  @Column({ nullable: true })
  experienceLevel: string;

  @Column()
  applicationUrl: string;

  @Column({ type: 'int', nullable: true })
  salaryMin?: number;

  @Column({ type: 'int', nullable: true })
  salaryMax?: number;

  @Column({ nullable: true })
  salaryCurrency?: string;

  @ManyToOne(() => Company, (company) => company.jobs, { cascade: true })
  @JoinColumn()
  company: Company;
}
