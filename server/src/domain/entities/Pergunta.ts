import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, Unique } from "typeorm";
import { Tema } from "./Tema";
import { Professor } from "./Professor";
import { Prova } from "./Prova";

@Entity({ name: "pergunta" })
@Unique(["tema", "descricao"])
export class Pergunta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  descricao!: string;

  @ManyToOne(() => Tema, (tema) => tema.perguntaTema, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "temaId" })
  tema!: Tema;

  @ManyToOne(() => Professor, (professor) => professor.perguntaProfesso, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "professorId" })
  professor!: Professor;

  @Column({ type: "varchar", length: 500, nullable: false })
  respostas!: string;

  @ManyToMany(() => Prova, (prova) => prova.perguntas)
  provas!: Prova[];
}
