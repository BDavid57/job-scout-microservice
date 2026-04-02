import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('regions')
@Index(['id'])
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
