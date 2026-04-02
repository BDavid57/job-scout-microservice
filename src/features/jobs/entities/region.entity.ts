import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
