import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pergunta } from "./Pergunta";
import { Exclude } from "class-transformer";

@Entity({ name: "professor" })
export class Professor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false})
  nome!: string;

  @Column({ type: 'varchar', length: 100, nullable: false})
  email!: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 80, nullable: false})
  senha!: string;

  @OneToMany(() => Pergunta, (pergunta) => pergunta.professor, { cascade: true, onDelete: "CASCADE" })
  perguntaProfesso!: Pergunta[];
  
}