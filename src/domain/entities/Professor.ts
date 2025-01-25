import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "professor" })
export class Professor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false})
  nome!: string;

  @Column({ type: 'varchar', length: 100, nullable: false})
  email!: string;

  @Column({ type: 'varchar', length: 80, nullable: false})
  senha!: string;
  
}