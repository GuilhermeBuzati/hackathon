import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Materia } from "./Materia";
import { Pergunta } from "./Pergunta";

@Entity({ name: "tema" })
export class Tema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true})
  descricao!: string;

  @Column({ type: 'varchar', length: 50, nullable: false})
  periodo!: string;
  
  @ManyToOne(() => Materia, (materia) => materia.temaMateria, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "materiaId" })
  materia!: Materia;

  @OneToMany(() => Pergunta, (pergunta) => pergunta.tema, { cascade: true, onDelete: "CASCADE" })
  perguntaTema!: Pergunta[];
}