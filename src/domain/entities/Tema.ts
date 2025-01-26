import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Materia } from "./Materia";
import { Periodo } from "./Periodo";

@Entity({ name: "tema" })
export class Tema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false})
  descricao!: string;
  
  @ManyToOne(() => Materia, (materia) => materia.temaMateria, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "materiaId" })
  materia!: Materia;

  @ManyToOne(() => Periodo, (periodo) => periodo.temaPeriodo, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "periodoId" })
  periodo!: Periodo;
}