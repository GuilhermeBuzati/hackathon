import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tema } from "./Tema";

@Entity({ name: "periodo" })
export class Periodo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true})
  descricao!: string;

  @OneToMany(() => Tema, (tema) => tema.materia, { cascade: true, onDelete: "CASCADE" })
  temaPeriodo!: Tema[];
  
}