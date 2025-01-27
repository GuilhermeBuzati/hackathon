import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Materia } from "./Materia";
import { Periodo } from "./Periodo";
import { Pergunta } from "./Pergunta";

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

  @OneToMany(() => Pergunta, (pergunta) => pergunta.tema, { cascade: true, onDelete: "CASCADE" })
  perguntaTema!: Pergunta[];
}