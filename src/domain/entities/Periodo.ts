import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "periodo" })
export class Periodo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false})
  descricao!: string;
  
}