import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tema } from "./Tema";

@Entity({ name: "materia" })
export class Materia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false})
  descricao!: string;
  
  @OneToMany(() => Tema, (tema) => tema.materia, { cascade: true, onDelete: "CASCADE" })
  temaMateria!: Tema[];
}