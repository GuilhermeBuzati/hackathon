import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Materia } from "./Materia";
import { Pergunta } from "./Pergunta";

@Entity({ name: "Prova" })
export class Prova {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    titulo!: string;

    @ManyToOne(() => Materia, (materia) => materia.temaMateria, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "materiald" })
    materia!: Materia;

    @ManyToMany(() => Pergunta, (pergunta) => pergunta.provas)
    @JoinTable({
        name: "prova_pergunta",
        joinColumn: {
            name: "provaId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "perguntaId",
            referencedColumnName: "id",
        },
    })
    perguntas!: Pergunta[];
}