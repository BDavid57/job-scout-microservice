import { Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm';

@Entity('countries')
@Index(['name'])
export class Country {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  code?: string;

  @Column()
  region?: string;
}
