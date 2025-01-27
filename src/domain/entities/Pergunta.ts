import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Tema } from "./Tema";
import { Professor } from "./Professor";
import { Resposta } from "./Resposta";

@Entity({ name: "pergunta" })
export class Pergunta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 200, nullable: false})
  descricao!: string;
  
  @ManyToOne(() => Tema, (tema) => tema.perguntaTema, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "temaId" })
  tema!: Tema;

  @ManyToOne(() => Professor, (professor) => professor.perguntaProfesso, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "professorId" })
  professor!: Professor;

  @OneToMany(() => Resposta, (resposta) => resposta.pergunta, { cascade: true, onDelete: "CASCADE" })
  respostasPergunta!: Resposta[];
}