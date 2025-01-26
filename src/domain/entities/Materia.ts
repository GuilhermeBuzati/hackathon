import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "materia" })
export class Materia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false})
  descricao!: string;
  
}