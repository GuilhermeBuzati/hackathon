import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Pergunta } from "./Pergunta";

@Entity({ name: "resposta" })
export class Resposta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 200, nullable: false})
  descricao!: string;
  
  @ManyToOne(() => Pergunta, (pergunta) => pergunta.respostasPergunta, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "perguntaId" })
  pergunta!: Pergunta;

}